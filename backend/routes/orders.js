const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const User = require("../models/User");
const { verifyToken } = require("../middleware/verifyToken");
const sendEmail = require("../config/emailService");

const router = express.Router();

// Email templates
const createUserEmailTemplate = (order, user) => `
  <div style="font-family: Arial;">
    <h2>Thanks for your order, ${user.username || "Customer"}!</h2>
    <p>Your order has been placed successfully.</p>
    <p><b>Order ID:</b> ${order._id}</p>
    <p><b>Total:</b> ₹${order.total}</p>
    <ul>
      ${order.items.map(
        (i) => `<li>${i.name} × ${i.quantity} — ₹${i.price * i.quantity}</li>`
      ).join("")}
    </ul>
    <p>We’ll notify you once it’s shipped.</p>
    <p>– Ashrafi Graphics Team</p>
  </div>
`;

const createAdminEmailTemplate = (order, user) => `
  <div style="font-family: Arial;">
    <h2>🚨 New Order Received</h2>
    <p><b>Customer:</b> ${user.email}</p>
    <p><b>Total:</b> ₹${order.total}</p>
    <p><b>Items:</b></p>
    <ul>
      ${order.items.map(
        (i) => `<li>${i.name} × ${i.quantity} — ₹${i.price * i.quantity}</li>`
      ).join("")}
    </ul>
  </div>
`;

// Create new order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items, total, phone, address, paymentMethod } = req.body;
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const formattedItems = items.map((i) => ({
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      selectedSize: i.selectedSize || null,
    }));

    const order = await Order.create({
      userId: user._id,
      userEmail: user.email,
      items: formattedItems,
      total,
      phone,
      address,
      paymentMethod,
    });

    await sendEmail(
      user.email,
      `Order Confirmation - #${order._id}`,
      createUserEmailTemplate(order, user)
    );

    await sendEmail(
      process.env.EMAIL_REPLY_TO,
      `🚨 New Order from ${user.email}`,
      createAdminEmailTemplate(order, user)
    );

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Order error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

module.exports = router;
