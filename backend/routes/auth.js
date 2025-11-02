// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const User = require("../models/User");
const TempUser = require("../models/TempUser");
const Otp = require("../models/Otp");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken");

// 🔑 Generate JWT
const generateToken = (user) =>
  jwt.sign({ _id: user._id, isAdmin: !!user.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

// ✅ Signup Request (save + send OTP)
router.post("/signup-request", async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    await TempUser.deleteMany({ email });
    await TempUser.create({ username, email, password: hashed, phone, address });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    // Send OTP via Resend
    await resend.emails.send({
      from: "Ashrafi Graphics <no-reply@ashrafigraphic.com>",
      to: email,
      subject: "Ashrafi Graphics - Signup OTP",
      html: `
        <h2>Your OTP Code</h2>
        <p>Use this code to verify your signup:</p>
        <h1 style="letter-spacing:5px;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    });

    res.json({ message: "✅ OTP sent. Verify to complete signup." });
  } catch (err) {
    console.error("Signup request error:", err.message);
    res.status(500).json({ message: "Server error while signup." });
  }
});

// ✅ Signup Verify (OTP + move to real User)
router.post("/signup-verify", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp)
      return res.status(400).json({ message: "❌ Invalid or expired OTP" });

    await Otp.deleteMany({ email });
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser)
      return res.status(400).json({ message: "Temp signup expired or missing" });

    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
      phone: tempUser.phone,
      address: tempUser.address,
      isAdmin: false,
    });
    const saved = await newUser.save();
    await TempUser.deleteOne({ email });

    const token = generateToken(saved);

    res.json({
      message: "✅ Signup successful",
      user: {
        _id: saved._id,
        username: saved.username,
        email: saved.email,
        phone: saved.phone,
        address: saved.address,
        isAdmin: saved.isAdmin,
        token,
      },
    });
  } catch (err) {
    console.error("Signup verify error:", err.message);
    res.status(500).json({ message: "Server error while verification." });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

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
    res.status(500).json({ message: "Server error while login." });
  }
});

module.exports = router;
