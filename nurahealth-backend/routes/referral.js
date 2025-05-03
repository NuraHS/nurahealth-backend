const express = require("express");
const router = express.Router();
const path = require("path");
const createReferralDocx = require("../utils/createReferralDocx");

router.post("/generate", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Missing letter content" });
  }

  try {
    // Create DOCX file
    const filePath = await createReferralDocx(content, "referral_letter.docx");

    // TEMP placeholder link (we’ll replace with real Google Drive link in Step 3C)
    const downloadUrl = "https://placeholder.link.com/referral_letter.docx";

    console.log("✅ Referral letter generated at:", filePath);

    return res.status(200).json({ downloadUrl });
  } catch (err) {
    console.error("❌ Failed to generate referral letter:", err);
    return res.status(500).json({ error: "Server error creating letter" });
  }
});

module.exports = router;
