const Otp = require("../models/Otp");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../config/emailService");

// Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    // generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // delete old OTPs
    await Otp.deleteMany({ email });

    // save new OTP
    await Otp.create({ email, otp, createdAt: new Date() });

    // email body
    const html = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>🔐 Your OTP Code</h2>
        <p>Use this OTP to verify your account or reset your password:</p>
        <div style="font-size: 28px; font-weight: bold; background: #f3f3f3; padding: 10px; text-align: center;">
          ${otp}
        </div>
        <p>This code will expire in 5 minutes.</p>
        <p>– Ashrafi Graphics</p>
      </div>
    `;

    await sendEmail(email, "Your OTP Code - Ashrafi Graphics", html);
    console.log(`✅ Generated OTP: ${otp} for ${email}`);

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
    if (!email || !otp)
      return res.status(400).json({ error: "Email and OTP are required" });

    const record = await Otp.findOne({ email });
    if (!record) return res.status(400).json({ error: "Invalid or expired OTP" });

    if (record.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // delete OTP after success
    await Otp.deleteOne({ _id: record._id });

    // issue token for password reset or verification
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });

    res.json({ message: "✅ OTP verified successfully", token });
  } catch (err) {
    console.error("❌ Verify OTP error:", err);
    res.status(500).json({ error: "OTP verification failed" });
  }
};
