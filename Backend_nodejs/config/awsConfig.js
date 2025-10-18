const { S3Client } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION, // Ensure this is defined in .env
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Defined in .env
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Defined in .env
  },
});

module.exports = s3;
