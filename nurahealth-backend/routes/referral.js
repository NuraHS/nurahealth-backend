{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require("express");\
const router = express.Router();\
\
router.post("/generate", async (req, res) => \{\
  const \{ content \} = req.body;\
\
  if (!content) \{\
    return res.status(400).json(\{ error: "Missing letter content" \});\
  \}\
\
  console.log("Received referral content:", content);\
\
  // Temporary placeholder link \'97 will later return a real Google Drive link\
  const downloadUrl = "https://placeholder.link.com/letter.docx";\
\
  return res.status(200).json(\{ downloadUrl \});\
\});\
\
module.exports = router;}