const Contact = require("../models/Contact");

// Create new contact submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact
    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save to database
    await contact.save();

    res.status(201).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting form. Please try again.",
      error: error.message,
    });
  }
};

// Get all contact submissions (for admin)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message,
    });
  }
};