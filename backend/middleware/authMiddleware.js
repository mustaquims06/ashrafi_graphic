// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // adjust path if your project structure differs

/**
 * verifyToken
 * - Verifies JWT from Authorization header
 * - Attaches full user object (without password) to req.user
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

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
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * verifyAdmin
 * - Ensures that the authenticated user has isAdmin === true
 */
const verifyAdmin = [verifyToken, (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
}];

module.exports = { verifyToken, verifyAdmin };
