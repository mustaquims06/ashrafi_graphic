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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create Temp User
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

    console.log("✅ Generated OTP:", otp, "for", email);

    // Send OTP email using Resend
    try {
      await resend.emails.send({
        from: "Ashrafi Graphics <onboarding@resend.dev>",
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

      console.log("✅ OTP email sent successfully to", email);
    } catch (err) {
      console.error("❌ Email send failed:", err.message);
    }

    res.json({ message: "✅ OTP sent successfully. Please verify to continue." });
  } catch (err) {
    console.error("Signup request error:", err.message);
    res.status(500).json({ message: "Server error while processing signup." });
  }
});

// ✅ Verify OTP & Create Final User
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

module.exports = router;
