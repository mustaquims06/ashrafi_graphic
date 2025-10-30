const express = require("express");
const router = express.Router();
const { createContact, getAllContacts } = require("../controllers/contactController");
const { verifyToken } = require("../middleware/verifyToken");

// Public route - Submit contact form
router.post("/submit", createContact);

// Protected route - Get all contacts (admin only)
router.get("/all", verifyToken, getAllContacts);

module.exports = router;