require("dotenv").config();
const sendEmail = require("./src/utils/sendEmail");

sendEmail("YOUR_PERSONAL_EMAIL@gmail.com", "Test OTP", "Hello bro email working ✅")
  .then(() => console.log("✅ Email Sent"))
  .catch((err) => console.log("❌ Error:", err.message));
