const express = require("express");
const router = express.Router();
const createReferralDocx = require("../utils/createReferralDocx");
const createTranscriptPdf = require("../utils/createTranscriptPdf");
const uploadToDrive = require("../utils/uploadToDrive"); // NEW

router.post("/generate", async (req, res) => {
  const { content, transcript } = req.body;

  if (!content || !transcript) {
    return res.status(400).json({ error: "Missing letter content or transcript" });
  }

  try {
    const referralDocxPath = await createReferralDocx(content, "referral_letter.docx");
    const transcriptPdfPath = await createTranscriptPdf(transcript, "chat_transcript.pdf");

    // 🆕 Upload to Google Drive
    const referralLink = await uploadToDrive(referralDocxPath, "referral_letter.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    const transcriptLink = await uploadToDrive(transcriptPdfPath, "chat_transcript.pdf", "application/pdf");

    return res.status(200).json({
      referralLetter: referralLink,
      chatTranscript: transcriptLink
    });
  } catch (err) {
    console.error("❌ Error:", err);
    return res.status(500).json({ error: "Failed to generate or upload files" });
  }
});

module.exports = router;
