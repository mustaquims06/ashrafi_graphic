const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userEmail: { type: String },

  items:     [orderItemSchema],
  total:     { type: Number },

  phone:     { type: String },
  address:   { type: String },

  paymentMethod: { type: String },   // "COD" | "Razorpay"

  // 🔥 NEW FIELDS (without disturbing old ones)
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);