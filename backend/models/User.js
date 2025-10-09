// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String },  // Not required because of Google login
  isAdmin:  { type: Boolean, default: false },
  phone:    { type: String },
  address:  { type: String },
  googleId: { type: String },
  profileImage: { type: String },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
