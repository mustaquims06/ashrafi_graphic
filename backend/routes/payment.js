const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/verifyToken');

// Create a new order
router.post('/create-order', verifyToken, createOrder);

// Verify payment
router.post('/verify-payment', verifyToken, verifyPayment);

module.exports = router;