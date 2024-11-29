const express = require("express");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const sharp = require("sharp");
const path = require("path");
const User = require("../models/User");

const router = express.Router();

// Generate QR Code and Save as Image
router.post("/generate-home-qr", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  let user = await User.findOne({ userId });
  if (!user) {
    const homeId = uuidv4();
    const uniqueUrl = `${process.env.BASE_URL}/visit?homeId=${homeId}`;

    user = new User({ userId, homeId, qrCodeUrl: uniqueUrl });
    await user.save();
  }

  const qrCodePath = path.join(__dirname, "../public/qrcodes", `${user.homeId}.jpeg`);
  const brandText = "Powered by DoorZap";
  const explanationText = "Scan this QR code.";
  const vistortext ="To notify the homeowner before knocking";

  try {
    // Generate QR Code as a PNG buffer
    const qrCodeBuffer = await QRCode.toBuffer(user.qrCodeUrl, { type: "png", width: 400, margin: 1 });

    // Create an SVG containing the text with proper spacing
    const svgText = `
      <svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="30" text-anchor="middle" font-size="20" fill="black" font-family="Arial">${brandText}</text>
        <text x="50%" y="60" text-anchor="middle" font-size="16" fill="black" font-family="Arial">${explanationText}</text>
          <text x="50%" y="80" text-anchor="middle" font-size="16" fill="black" font-family="Arial">${vistortext}</text>
      </svg>
    `;

    // Render the SVG into a buffer
    const textBuffer = Buffer.from(svgText);

    // Combine the QR code with the text
    const finalImage = await sharp({
      create: {
        width: 400,
        height: 520, // 400 for QR code + 120 for text
        channels: 3,
        background: { r: 255, g: 255, b: 255 }, // White background
      },
    })
      .composite([
        { input: qrCodeBuffer, top: 0, left: 0 }, // Place QR code at the top
        { input: textBuffer, top: 400, left: 0 }, // Place text below QR code
      ])
      .jpeg();

    // Save the final image
    await finalImage.toFile(qrCodePath);

    res.json({ qrCodeUrl: user.qrCodeUrl, imageUrl: `${process.env.BASE_URL}/public/qrcodes/${user.homeId}.jpeg` });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

module.exports = router;
