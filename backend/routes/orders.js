// backend/routes/orders.js
const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();
const nodemailer = require('nodemailer');

// --- Email setup ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

// --- Email Templates ---
const createUserEmailTemplate = (order, user) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>Hi ${user.username || "Customer"},</h2>
    <p>Thank you for your order with <strong>Ashrafi Graphic</strong>!</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total:</strong> ₹${order.total}</p>
    <h3>Items:</h3>
    <ul>
      ${order.items.map(
        (i) => `<li>${i.name} × ${i.quantity} — ₹${i.price * i.quantity}
        ${i.selectedSize ? `(Size: ${i.selectedSize})` : ""}</li>`
      ).join("")}
    </ul>
    <h3>Delivery Details:</h3>
    <p><strong>Phone:</strong> ${order.phone}</p>
    <p><strong>Address:</strong> ${order.address}</p>
    <p>Payment Method: ${order.paymentMethod}</p>
    <hr/>
    <p>We’ll notify you once your order is shipped. Thanks for shopping!</p>
  </div>
`;

const createAdminEmailTemplate = (order, user) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>🚨 New Order Received</h2>
    <p><strong>Customer:</strong> ${user.email}</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total:</strong> ₹${order.total}</p>
    <h3>Items:</h3>
    <ul>
      ${order.items.map(
        (i) => `<li>${i.name} × ${i.quantity} — ₹${i.price * i.quantity}
        ${i.selectedSize ? `(Size: ${i.selectedSize})` : ""}</li>`
      ).join("")}
    </ul>
    <h3>Delivery Info:</h3>
    <p>Phone: ${order.phone}</p>
    <p>Address: ${order.address}</p>
    <p>Payment Method: ${order.paymentMethod}</p>
  </div>
`;

// --- Create Order ---
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, total, phone, address, paymentMethod } = req.body;

    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const itemsWithIds = items.map(i => ({
      productId: mongoose.Types.ObjectId.isValid(i.productId)
        ? new mongoose.Types.ObjectId(i.productId)
        : undefined,
      name: i.name,
      price: i.price,
      quantity: i.quantity || 1,
      selectedSize: i.selectedSize || null
    }));

    const newOrder = new Order({
      userId: user._id,
      userEmail: user.email,
      items: itemsWithIds,
      total,
      phone,
      address,
      paymentMethod
    });

    const savedOrder = await newOrder.save();

    // Send confirmation emails
    try {
      await Promise.all([
        transporter.sendMail({
          from: `"Ashrafi Graphic" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: `Order Confirmation - #${savedOrder._id}`,
          html: createUserEmailTemplate(savedOrder, user)
        }),
        transporter.sendMail({
          from: `"Ashrafi Graphic" <${process.env.EMAIL_USER}>`,
          to: ADMIN_EMAIL,
          subject: `🚨 New Order Received - #${savedOrder._id}`,
          html: createAdminEmailTemplate(savedOrder, user)
        })
      ]);
    } catch (emailError) {
      console.error("❌ Email sending error:", emailError.message);
    }

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('❌ Order creation error:', err.message);
    res.status(400).json({ error: 'Order failed', details: err.message });
  }
});

// --- Get All Orders ---
router.get('/', verifyToken, async (req, res) => {
  try {
    let orders;
    if (req.user.isAdmin) {
      orders = await Order.find()
        .populate('userId', 'username email')
        .sort({ date: -1 });
    } else {
      orders = await Order.find({ userId: req.user._id }).sort({ date: -1 });
    }
    res.json(orders);
  } catch (err) {
    console.error('❌ Fetch orders error:', err.message);
    res.status(500).json({ error: 'Could not fetch orders' });
  }
});

// --- Get Single Order ---
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'username email')
      .populate('items.productId', 'name price images');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Only admin or owner can view
    if (!req.user.isAdmin && String(order.userId._id) !== String(req.user._id)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(order);
  } catch (err) {
    console.error('❌ Fetch single order error:', err.message);
    res.status(500).json({ error: 'Could not fetch order' });
  }
});

module.exports = router;
