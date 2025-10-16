const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const TempUser = require("../models/TempUser");
const Otp = require("../models/Otp");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken");

// Utility: create JWT
const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, isAdmin: !!user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// ✅ Signup Request (store in TempUser + send OTP)
router.post("/signup-request", async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check if user already exists in real collection
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // remove any old temp user for this email
    await TempUser.deleteMany({ email });

    // save in TempUser
    await TempUser.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    // send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Signup Verification OTP",
      text: `Your OTP for signup is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ message: "✅ OTP sent. Verify to complete signup." });
  } catch (err) {
    console.error("Signup request error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Signup Verify (OTP + move to User collection)
router.post("/signup-verify", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ message: "❌ Invalid or expired OTP" });
    }

    // cleanup OTP
    await Otp.deleteMany({ email });

    // get temp user
    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return res.status(400).json({ message: "❌ Temp signup expired or missing" });
    }

    // create real user
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
    console.error("Signup verify error:", err);
    res.status(500).json({ message: "Server error" });
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

    // Check if user was created via Google Auth
    if (user.googleId) {
      return res.status(400).json({ message: "Please login with Google" });
    }

    // Only compare password if it exists (for non-Google users)
    if (!user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    // strict admin check (optional)
    if (
      email === process.env.ADMIN_EMAIL &&
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(403).json({ message: "Admin password incorrect" });
    }

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
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/google", async (req, res) => {
  try {
    const { tokenId } = req.body;
    if (!tokenId) return res.status(400).json({ message: "Token missing" });

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        username: name || email.split("@")[0],
        email,
        googleId,
        profileImage: picture,
        isVerified: true,
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

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
    console.error("Google login error:", err);
    res.status(400).json({ message: "Invalid Google token" });
  }
});

// ✅ Get all users (admin only)
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Reset Password (after OTP verified)
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, resetToken } = req.body;
    if (!email || !newPassword || !resetToken) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // verify reset token
    try {
      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
      if (decoded.email !== email) {
        return res.status(401).json({ message: "Invalid token for this email" });
      }
    } catch (err) {
      return res.status(401).json({ message: "❌ Invalid or expired reset token" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    await user.save();

    res.json({ message: "✅ Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
