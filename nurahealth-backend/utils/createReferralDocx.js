const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, TextRun } = require("docx");

async function createReferralDocx(content, filename = "referral.docx") {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(content)],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join("/tmp", filename);
  fs.writeFileSync(outputPath, buffer);
  return outputPath;
}

module.exports = createReferralDocx;
