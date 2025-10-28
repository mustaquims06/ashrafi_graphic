// backend/routes/wishlist.js
const express = require('express');
const WishlistItem = require('../models/WishlistItem');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

/**
 * Add to wishlist
 * POST /wishlist  (body: { productId, optional userEmail })
 * Requires auth
 */
router.post('/', verifyToken, async (req, res) => {
  const { productId, userEmail } = req.body;
  try {
    const email = userEmail || req.user.email;
    const item = new WishlistItem({ userEmail: email, productId, userId: req.user._id });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('Wishlist save error:', err);
    res.status(400).json({ error: 'Wishlist failed', details: err.message });
  }
});

/**
 * Get wishlist items for a user
 * GET /wishlist/:userEmail  or GET /wishlist/me
 * Requires auth
 */
router.get('/:userEmail', verifyToken, async (req, res) => {
  try {
    const requestedEmail = req.params.userEmail === 'me' ? req.user.email : req.params.userEmail;
    // Only allow fetching your own wishlist unless admin in future (simple check)
    if (requestedEmail !== req.user.email) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const items = await WishlistItem.find({ userEmail: requestedEmail });
    res.json(items);
  } catch (err) {
    console.error('Wishlist fetch error:', err);
    res.status(400).json({ error: 'Failed to fetch wishlist', details: err.message });
  }
});

module.exports = router;
