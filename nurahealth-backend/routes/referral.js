const express = require("express");
const router = express.Router();

router.post("/generate", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Missing letter content" });
  }

  console.log("Received referral content:", content);

  // Temporary placeholder link — will later return a real Google Drive link
  const downloadUrl = "https://placeholder.link.com/letter.docx";

  return res.status(200).json({ downloadUrl });
});

module.exports = router;
