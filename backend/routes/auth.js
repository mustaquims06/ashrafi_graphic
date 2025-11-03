// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");
const TempUser = require("../models/TempUser");
const Otp = require("../models/Otp");

const resend = new Resend(process.env.RESEND_API_KEY);
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ Helper: Generate JWT
const generateToken = (user) =>
  jwt.sign(
    { _id: user._id, isAdmin: !!user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

// ✅ Signup Request: Generate OTP & Send Email
router.post("/signup-request", async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Save temp user
    const hashedPassword = await bcrypt.hash(password, 10);
    await TempUser.deleteMany({ email });
    await TempUser.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    console.log("✅ Signup OTP:", otp, "for", email);

    // Send email
    await resend.emails.send({
      from: "Ashrafi Graphics <noreply@ashrafigraphic.com>",
      to: email,
      subject: "Ashrafi Graphics - Signup OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 15px;">
          <h2>Welcome to Ashrafi Graphics</h2>
          <p>Use the OTP below to verify your signup:</p>
          <h1 style="letter-spacing: 5px; color: #22c55e;">${otp}</h1>
          <p>This OTP expires in <strong>5 minutes</strong>.</p>
        </div>
      `,
    });

    res.json({ message: "✅ Signup OTP sent successfully." });
  } catch (err) {
    console.error("Signup request error:", err.message);
    res.status(500).json({ message: "Server error while processing signup." });
  }
});

// ✅ Verify Signup OTP & Create User
router.post("/signup-verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ message: "❌ Invalid or expired OTP" });
    }

    await Otp.deleteMany({ email });

    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return res.status(400).json({ message: "Signup session expired." });
    }

    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
      phone: tempUser.phone,
      address: tempUser.address,
      isAdmin: false,
    });

    const savedUser = await newUser.save();
    await TempUser.deleteOne({ email });

    const token = generateToken(savedUser);

    res.json({
      message: "✅ Signup successful!",
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        phone: savedUser.phone,
        address: savedUser.address,
        isAdmin: savedUser.isAdmin,
        token,
      },
    });
  } catch (err) {
    console.error("Signup verify error:", err.message);
    res.status(500).json({ message: "Server error during verification." });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect email or password" });

    const token = generateToken(user);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error during login." });
  }
});

// ✅ Forgot Password: Send OTP via Resend
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    await resend.emails.send({
      from: "Ashrafi Graphics <noreply@ashrafigraphic.com>",
      to: email,
      subject: "Password Reset OTP - Ashrafi Graphics",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>🔐 Password Reset Request</h2>
          <p>Use the OTP below to reset your password:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
          <p>If you didn’t request this, please ignore this email.</p>
          <p>– Ashrafi Graphics Team</p>
        </div>
      `,
    });

    console.log(`✅ Reset OTP sent to ${email}: ${otp}`);
    res.json({ message: "✅ OTP sent successfully to your email" });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: "Failed to send reset OTP" });
  }
});

// ✅ Verify Reset OTP
router.post("/verify-reset-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email });
    if (!record || record.otp !== otp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    await Otp.deleteMany({ email });

    // Generate temporary reset token
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    res.json({ message: "✅ OTP verified successfully", resetToken });
  } catch (err) {
    console.error("Verify reset OTP error:", err.message);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
});

// ✅ Reset Password Route
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;

    if (!email || !newPassword || !resetToken) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch {
      return res.status(400).json({ message: "❌ Invalid or expired reset token" });
    }

    if (decoded.email !== email) {
      return res.status(400).json({ message: "❌ Email mismatch" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "✅ Password reset successful!" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error during password reset." });
  }
});

module.exports = router;
