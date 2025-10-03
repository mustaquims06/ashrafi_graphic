const Otp = require("../models/Otp");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

    // setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
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
