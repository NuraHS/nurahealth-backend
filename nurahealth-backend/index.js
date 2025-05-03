const express = require("express");\
const app = express();\
const referralRoutes = require("./routes/referral");\
\
app.use(express.json());\
app.use("/referral-letter", referralRoutes);\
\
const PORT = process.env.PORT || 3000;\
app.listen(PORT, () => \{\
  console.log(`API running on http://localhost:$\{PORT\}`);\
\});}
