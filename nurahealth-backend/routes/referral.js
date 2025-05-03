const express = require("express");
const router = express.Router();
const path = require("path");
const createReferralDocx = require("../utils/createReferralDocx");
const createTranscriptPdf = require("../utils/createTranscriptPdf");

router.post("/generate", async (req, res) => {
  const { content, transcript } = req.body;

  if (!content || !transcript) {
    return res.status(400).json({ error: "Missing letter content or transcript" });
  }

  try {
    // Create both files
    const referralDocxPath = await createReferralDocx(content, "referral_letter.docx");
    const transcriptPdfPath = await createTranscriptPdf(transcript, "chat_transcript.pdf");

    // TEMP links (to be replaced with Google Drive upload in next step)
    const downloadUrls = {
      referralLetter: "https://placeholder.link.com/referral_letter.docx",
      chatTranscript: "https://placeholder.link.com/chat_transcript.pdf"
    };

    console.log("✅ Files generated:");
    console.log(" - Referral:", referralDocxPath);
    console.log(" - Transcript:", transcriptPdfPath);

    return res.status(200).json(downloadUrls);
  } catch (err) {
    console.error("❌ Failed to generate files:", err);
    return res.status(500).json({ error: "Server error generating files" });
  }
});

module.exports = router;
