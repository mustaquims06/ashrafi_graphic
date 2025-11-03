const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp } = require("../controllers/otpController");

// ✅ These must be functions
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
