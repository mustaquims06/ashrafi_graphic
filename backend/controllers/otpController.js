const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const transporter = require('../config/transporter');

// Verify email configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // check if already exists
    let existing = await Otp.findOne({ email });

    if (existing && existing.attempts >= 5) {
      return res.status(429).json({ error: "❌ Too many OTP requests. Please try again later." });
    }

    // generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // delete old OTPs for this email
    await Otp.deleteMany({ email });

    // save new OTP
    await Otp.create({
      email,
      otp,
      attempts: existing ? existing.attempts + 1 : 1,
    });

    // use configured transporter
    const transporter = require('../config/transporter');

    // send email with OTP
    await transporter.sendMail({
      from: `"Ashrafi Graphics" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP - Ashrafi Graphics",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You have requested to reset your password. Here is your OTP:</p>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP is valid for 5 minutes only.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p style="color: #666; margin-top: 20px;">Best regards,<br>Ashrafi Graphics Team</p>
        </div>
      `,
    });

    res.json({ message: "✅ OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ error: "❌ Failed to send OTP" });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email });
    if (!record) return res.status(400).json({ error: "❌ Invalid or expired OTP" });

    // lockout check
    if (record.failedAttempts >= 5) {
      return res.status(429).json({ error: "❌ Too many failed attempts. Try again later." });
    }

    if (record.otp !== otp) {
      record.failedAttempts += 1;
      await record.save();
      return res.status(400).json({
        error: `❌ Wrong OTP. Attempts left: ${5 - record.failedAttempts}`,
      });
    }

    // correct OTP → delete it (one-time use)
    await Otp.deleteOne({ _id: record._id });

    // issue reset token
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });

    res.json({ message: "✅ OTP verified", resetToken });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ error: "❌ OTP verification failed" });
  }
};
