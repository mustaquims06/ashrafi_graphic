const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const User = require("../models/User");
const { verifyToken } = require("../middleware/verifyToken");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const router = express.Router();

// Create new order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items, total, phone, address, paymentMethod } = req.body;
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(400).json({ error: "User not found" });

    const newOrder = new Order({
      userId: user._id,
      userEmail: user.email,
      items,
      total,
      phone,
      address,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    // Send mail to user
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: `✅ Order Confirmation - Ashrafi Graphics`,
      html: `
        <div style="font-family:Arial; padding:20px;">
          <h2>Thank you for your order, ${user.username || "Customer"}!</h2>
          <p><b>Order ID:</b> ${savedOrder._id}</p>
          <p><b>Total:</b> ₹${savedOrder.total}</p>
          <p>We'll notify you once it's shipped.</p>
        </div>
      `
    });

    // Send mail to admin
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `🚨 New Order Received - ${user.email}`,
      html: `
        <div style="font-family:Arial; padding:20px;">
          <h2>New Order Received</h2>
          <p><b>Customer:</b> ${user.email}</p>
          <p><b>Total:</b> ₹${savedOrder.total}</p>
          <p><b>Payment:</b> ${savedOrder.paymentMethod}</p>
        </div>
      `
    });

    res.status(201).json(savedOrder);

  } catch (err) {
    console.error("❌ Order Error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

module.exports = router;
