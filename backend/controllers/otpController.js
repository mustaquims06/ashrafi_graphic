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

    // delete old OTPs for this email
    await Otp.deleteMany({ email });

    // generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    await Otp.create({ email, otp });

    // send via Resend
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your OTP Code - Ashrafi Graphics",
      html: `
        <div style="font-family: Arial; max-width: 600px; margin:auto; padding:20px;">
          <h2>🔐 OTP Verification</h2>
          <p>Your verification code is:</p>
          <h1 style="letter-spacing:5px;">${otp}</h1>
          <p>This OTP is valid for <b>5 minutes</b>.</p>
          <p>– Ashrafi Graphics Team</p>
        </div>
      `
    });

    console.log(`✅ OTP sent to ${email}: ${otp}`);
    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.error("❌ OTP Send Error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// ✅ Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await Otp.findOne({ email });

    if (!record) return res.status(400).json({ error: "Invalid or expired OTP" });
    if (record.otp !== otp) return res.status(400).json({ error: "Incorrect OTP" });

    await Otp.deleteOne({ _id: record._id });

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });
    res.json({ message: "OTP verified", resetToken });

  } catch (err) {
    console.error("❌ OTP Verify Error:", err);
    res.status(500).json({ error: "OTP verification failed" });
  }
};
