// backend/routes/reviews.js
const express = require('express');
const Review = require('../models/Review');
const Order = require('../models/Order');
const User = require('../models/User');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

/**
 * Create review only if user purchased the product
 * POST /reviews/:productId
 */
router.post('/:productId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(400).json({ error: 'User not found' });

    const productId = req.params.productId;

    // Check if user purchased the product
    const ordered = await Order.findOne({
      userId: user._id,
      'items.productId': productId
    });

    if (!ordered) {
      return res.status(403).json({ error: 'You can review only products you purchased' });
    }

    const { comment, rating } = req.body;
    const review = new Review({
      productId,
      userId: user._id,
      name: user.username || user.email,
      comment,
      rating
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error('Review error:', err);
    res.status(400).json({ error: 'Review failed', details: err.message });
  }
});

/**
 * Get reviews for product
 * GET /reviews/:productId
 */
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Fetch reviews error:', err);
    res.status(500).json({ error: 'Could not fetch reviews' });
  }
});

module.exports = router;
