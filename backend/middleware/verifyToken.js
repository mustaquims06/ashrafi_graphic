const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/Order");

/**
 * verifyToken
 * Verifies JWT and attaches user object to req.user
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded._id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("verifyToken error:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Token verification failed" });
  }
};

/**
 * verifyAdmin
 * Checks if user is admin
 */
const verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

/**
 * verifyPurchase
 * Ensures user has purchased a product before reviewing
 */
const verifyPurchase = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: "User not authenticated" });

    const productId = req.params.productId;
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const hasOrder = await Order.findOne({
      userId: req.user._id,
      "items.productId": productId,
    });

    if (!hasOrder) {
      return res.status(403).json({ message: "You must purchase this product before reviewing it" });
    }

    next();
  } catch (err) {
    console.error("verifyPurchase error:", err);
    res.status(500).json({ message: "Server error while verifying purchase" });
  }
};

/**
 * optionalVerifyToken
 * Does not fail if no token, but attaches user if valid
 */
const optionalVerifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return next();

  const token = authHeader.split(" ")[1];
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded && decoded._id) {
      const user = await User.findById(decoded._id).select("-password");
      if (user) req.user = user;
    }
    next();
  } catch (err) {
    console.log("Optional token verification failed:", err.message);
    next();
  }
};

module.exports = { verifyToken, verifyAdmin, verifyPurchase, optionalVerifyToken };
