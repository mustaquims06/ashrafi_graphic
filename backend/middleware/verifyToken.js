// backend/middleware/verifyToken.js
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Order = require("../models/Order");

// Helper: minimal, safe user object
const toUserBasic = (u) => (u ? ({ _id: u._id, isAdmin: !!u.isAdmin, email: u.email }) : null);

/**
 * verifyToken
 * Verifies JWT and attaches user object to req.user
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || (!decoded._id && !decoded.id)) {
        return res.status(401).json({ message: "Invalid token payload" });
      }

      const userId = decoded._id || decoded.id;
      const user = await User.findById(userId).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });

      // EXISTING behavior (preserved)
      req.user = user;

      // ADDED features (do not remove anything)
      req.userBasic = toUserBasic(user); // minimal safe object
      req.token = token;                 // raw JWT if needed later

      next();
    } catch (err) {
      console.error("verifyToken error:", err);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Token verification failed" });
    }
  } catch (err) {
    console.error("Outer verifyToken error:", err);
    return res.status(500).json({ message: "Internal server error during token verification" });
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
 * verifyAdminFlexible
 * Admin check that works with either req.user or req.userBasic
 */
const verifyAdminFlexible = (req, res, next) => {
  const isAdmin = (req.user && req.user.isAdmin) || (req.userBasic && req.userBasic.isAdmin);
  if (!isAdmin) return res.status(403).json({ message: "Admin access required" });
  next();
};

/**
 * verifySelfOrAdmin(paramName = "id")
 * Allows only self (by param) or admin
 * Usage: router.get("/:id", verifyToken, verifySelfOrAdmin("id"), handler)
 */
const verifySelfOrAdmin = (paramName = "id") => (req, res, next) => {
  const paramId = (req.params && req.params[paramName]) || (req.body && req.body[paramName]);
  if (!paramId) return res.status(400).json({ message: `Missing param: ${paramName}` });

  const userId = (req.user?._id || req.userBasic?._id || "").toString();
  const isAdmin = (req.user && req.user.isAdmin) || (req.userBasic && req.userBasic.isAdmin);

  if (isAdmin || userId === String(paramId)) return next();
  return res.status(403).json({ message: "Not authorized" });
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
    const userId = decoded?._id || decoded?.id;
    if (userId) {
      const user = await User.findById(userId).select("-password");
      if (user) {
        req.user = user;                  // keep full user (existing behavior)
        req.userBasic = toUserBasic(user); // add minimal
        req.token = token;                 // add raw token
      }
    }
    next();
  } catch (err) {
    console.log("Optional token verification failed:", err.message);
    next();
  }
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyPurchase,
  optionalVerifyToken,
  // New helpers (added, nothing removed)
  verifyAdminFlexible,
  verifySelfOrAdmin,
};