const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
require("dotenv").config();


const app = express();
const PORT = 5000;

// Twilio credentials (store these in environment variables for security)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


app.use(cors());
app.use(express.json());

app.post("/send-sms", async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Phone number and message are required" });
  }

  try {
    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Replace with your Twilio phone number
      to: to,
    });
    res.status(200).json({ success: true, sid: sms.sid });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ success: false, error: "Failed to send SMS" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
