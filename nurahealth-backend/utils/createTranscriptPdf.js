const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function createTranscriptPdf(transcriptText, filename = "chat_transcript.pdf") {
  const doc = new PDFDocument();
  const filePath = path.join("/tmp", filename);
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.fontSize(12).text(transcriptText, {
    width: 410,
    align: "left"
  });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => resolve(filePath));
    writeStream.on("error", reject);
  });
}

module.exports = createTranscriptPdf;
