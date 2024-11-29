const express = require("express");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");
const generatePdf = require("../utils/generatePdf");
const User = require("../models/User");

const router = express.Router();

// Generate QR Code and Save PDF
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

  const pdfPath = await generatePdf(user.homeId, user.qrCodeUrl);
  res.json({ qrCodeUrl: user.qrCodeUrl, pdfUrl: `${process.env.BASE_URL}/public/qrcodes/${user.homeId}.pdf` });
});

module.exports = router;
