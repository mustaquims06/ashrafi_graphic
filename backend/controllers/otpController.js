const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("✅ Generated OTP:", otp, "for", email);

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    // Send OTP Email using Resend
    await resend.emails.send({
      from: `Ashrafi Graphic <noreply@ashrafigraphic.com>`, // verified domain
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
          <br/>
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
