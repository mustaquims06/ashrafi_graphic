const Otp = require("../models/Otp"); // ✅ Missing import added
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();

    console.log("✅ Generated OTP:", otp, "for", email);

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    // Send OTP Email using Resend
    await resend.emails.send({
      from: `Ashrafi Graphic <noreply@ashrafigraphic.com>`,
      to: email,
      subject: "Your OTP Code - Ashrafi Graphic",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>🔐 Your One-Time Password (OTP)</h2>
          <p>Use this code to verify your email:</p>
          <div style="background:#f5f5f5;padding:10px;font-size:24px;text-align:center;font-weight:bold;">
            ${otp}
          </div>
          <p>This OTP is valid for 5 minutes.</p>
          <p>— Team Ashrafi Graphic</p>
        </div>
      `
    });

    res.json({ message: "✅ OTP sent successfully!" });
  } catch (err) {
    console.error("❌ OTP Send Error:", err);
    res.status(500).json({ error: "Failed to send OTP email" });
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
    res.json({ message: "✅ OTP verified", resetToken });
  } catch (err) {
    console.error("❌ OTP Verify Error:", err);
    res.status(500).json({ error: "OTP verification failed" });
  }
};
