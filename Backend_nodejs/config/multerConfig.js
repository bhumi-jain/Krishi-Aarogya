const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./awsConfig");

const upload = multer({
  storage: multerS3({
    s3: s3, // Use the S3 client imported from awsConfig.js
    bucket: process.env.AWS_BUCKET_NAME, // Ensure the bucket name is correct in .env
    acl: "public-read", // Optional: Configure the access level for uploaded files
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  }),
});

module.exports = upload;
