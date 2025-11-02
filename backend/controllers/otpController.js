// backend/controllers/otpController.js
const Otp = require("../models/Otp");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    // Limit: prevent spam
    let existing = await Otp.findOne({ email });
    if (existing && existing.attempts >= 5) {
      return res
        .status(429)
        .json({ error: "❌ Too many OTP requests. Please try again later." });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Remove old OTP
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({
      email,
      otp,
      attempts: existing ? existing.attempts + 1 : 1,
      failedAttempts: 0,
      createdAt: new Date(),
    });

    console.log("✅ Generated OTP:", otp, "for", email);

    // ✅ Send OTP via Resend
    try {
      await resend.emails.send({
        from: "Ashrafi Graphics <onboarding@resend.dev>",
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
      console.log("✅ OTP email sent to:", email);
    } catch (mailErr) {
      console.error("❌ OTP email failed:", mailErr.message);
      return res.status(500).json({ error: "Email service failed. Please try again." });
    }

    res.json({ message: "✅ OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP error:", err.message);
    res.status(500).json({ error: "❌ Failed to send OTP" });
  }
};

// ✅ Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ error: "Email and OTP are required" });

    const record = await Otp.findOne({ email });
    if (!record)
      return res.status(400).json({ error: "❌ Invalid or expired OTP" });

    // Check lockout
    if (record.failedAttempts >= 5) {
      return res
        .status(429)
        .json({ error: "❌ Too many failed attempts. Try again later." });
    }

    // OTP mismatch
    if (record.otp !== otp) {
      record.failedAttempts += 1;
      await record.save();
      return res.status(400).json({
        error: `❌ Wrong OTP. Attempts left: ${5 - record.failedAttempts}`,
      });
    }

    // Correct OTP → delete record
    await Otp.deleteOne({ _id: record._id });

    // Create reset token valid for 10 minutes
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    res.json({ message: "✅ OTP verified", resetToken });
  } catch (err) {
    console.error("Verify OTP error:", err.message);
    res.status(500).json({ error: "❌ OTP verification failed" });
  }
};
