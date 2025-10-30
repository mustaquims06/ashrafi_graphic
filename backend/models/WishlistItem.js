// backend/models/WishlistItem.js
const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userEmail: { type: String },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  date:      { type: Date, default: Date.now }
});

module.exports = mongoose.model('WishlistItem', wishlistSchema);
