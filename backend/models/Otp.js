const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  attempts: { type: Number, default: 1 },        // how many times OTP was sent
  failedAttempts: { type: Number, default: 0 },  // wrong OTP attempts
  createdAt: { type: Date, default: Date.now, expires: 300 } // auto-expire in 5 min
});

module.exports = mongoose.model("Otp", otpSchema);
