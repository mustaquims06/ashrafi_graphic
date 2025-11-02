// backend/controllers/otpController.js
const Otp = require("../models/Otp");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const resend = require("../config/transporter");

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "❌ Email is required" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Remove old OTPs for same email
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({ email, otp, attempts: 1 });

    // Send via Resend
    const { data, error } = await resend.emails.send({
      from: "Ashrafi Graphics <no-reply@ashrafigraphic.com>",
      to: email,
      subject: "Your OTP Code - Ashrafi Graphics",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Verification Code</h2>
          <p>Your OTP code is:</p>
          <div style="font-size: 24px; font-weight: bold; color: #333; letter-spacing: 4px;">
            ${otp}
          </div>
          <p>This code will expire in <strong>5 minutes</strong>.</p>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return res.status(500).json({ error: "Failed to send OTP" });
    }

    console.log(`✅ OTP sent to ${email}`);
    res.json({ message: "✅ OTP sent successfully" });
  } catch (err) {
    console.error("❌ Send OTP error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await Otp.findOne({ email });

    if (!record) return res.status(400).json({ error: "❌ Invalid or expired OTP" });

    if (record.otp !== otp) {
      return res.status(400).json({ error: "❌ Incorrect OTP" });
    }

    // Delete after verification
    await Otp.deleteOne({ _id: record._id });

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });

    res.json({ message: "✅ OTP verified", resetToken });
  } catch (err) {
    console.error("❌ Verify OTP error:", err);
    res.status(500).json({ error: "OTP verification failed" });
  }
};
