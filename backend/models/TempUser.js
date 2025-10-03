// backend/models/TempUser.js
const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // store already-hashed password
  phone:    { type: String },
  address:  { type: String },
  createdAt: { type: Date, default: Date.now, expires: 600 } 
  // expires in 10 minutes → auto-deleted if not verified
});

module.exports = mongoose.model("TempUser", tempUserSchema);
