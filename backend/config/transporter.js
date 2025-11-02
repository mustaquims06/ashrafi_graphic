// backend/config/transporter.js
const { Resend } = require("resend");

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Test connection (optional)
(async () => {
  try {
    const response = await resend.emails.send({
      from: "Ashrafi Graphics <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "✅ Resend Setup Verified",
      html: "<p>Your Resend configuration is working perfectly!</p>",
    });
    console.log("✅ Resend email test sent successfully:", response.id);
  } catch (error) {
    console.error("⚠️ Resend configuration test failed:", error.message);
  }
})();

module.exports = resend;
