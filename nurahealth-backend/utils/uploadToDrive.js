const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/drive"]
);

const drive = google.drive({ version: "v3", auth });

async function uploadToDrive(filePath, filename, mimeType) {
  const fileMetadata = {
    name: filename,
    parents: [], // optional: specify a folder ID
  };

  const media = {
    mimeType,
    body: fs.createReadStream(filePath),
  };

  const file = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id, webViewLink, webContentLink",
  });

  // Make the file publicly accessible
  await drive.permissions.create({
    fileId: file.data.id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return file.data.webContentLink;
}

module.exports = uploadToDrive;
