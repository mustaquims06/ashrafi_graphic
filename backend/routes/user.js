const express = require("express");
const User = require("../models/User");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken"); // use the same verifyToken middleware
const router = express.Router();

/**
 * @route GET /api/users/profile
 * @desc  Get current user's profile
 */
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { address, phone } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (address !== undefined) user.address = address;
    if (phone !== undefined) user.phone = phone;

    await user.save();
    const sanitized = user.toObject();
    delete sanitized.password;
    res.json(sanitized);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
});
/**
 * @route PUT /api/users/profile
 * @desc  Update user profile
 */
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { address, phone } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (address !== undefined) user.address = address;
    if (phone !== undefined) user.phone = phone;

    await user.save();
    const sanitized = user.toObject();
    delete sanitized.password;
    res.json(sanitized);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error while updating profile" });
  }
});

/**
 * @route GET /api/users
 * @desc  Get all users (admin only)
 */
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

/**
 * @route GET /api/users/:id
 * @desc  Get a single user by ID (admin or self)
 */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Server error while fetching user" });
  }
});

/**
 * @route PUT /api/users/:id
 * @desc  Update user details (self or admin)
 */
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to update this user" });
    }

    const { username, email, phone } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, phone },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });

    res.json(updated);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error while updating user" });
  }
});

/**
 * @route DELETE /api/users/:id
 * @desc  Delete a user (admin only)
 */
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error while deleting user" });
  }
});

module.exports = router;
