const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const fs = require("fs");

const generatePdf = async (homeId, qrCodeUrl) => {
  const pdfPath = `./public/qrcodes/${homeId}.pdf`;

  if (!fs.existsSync("./public/qrcodes")) {
    fs.mkdirSync("./public/qrcodes", { recursive: true });
  }

  const qrCodeImage = await QRCode.toDataURL(qrCodeUrl);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.fontSize(20).text("Your Home QR Code", { align: "center" });
  doc.image(qrCodeImage, { fit: [200, 200], align: "center" });
  doc.fontSize(14).text(`Home ID: ${homeId}`, { align: "center" });
  doc.fontSize(12).text(`Scan this QR code to visit: ${qrCodeUrl}`, { align: "center" });
  doc.end();

  return pdfPath;
};

module.exports = generatePdf;
