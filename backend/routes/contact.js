// backend/routes/contact.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Contact form route
router.post("/apply", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    // 1️⃣ Save to MongoDB
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });
    const savedContact = await newContact.save();
    console.log("✅ Contact saved:", savedContact.email);

    // 2️⃣ Send email to admin
    await resend.emails.send({
      from: "Ashrafi Graphics <no-reply@ashrafigraphic.com>",
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${subject || "No subject"}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <div style="border-left:4px solid #007bff;padding:10px;">${message}</div>
      `,
    });

    // 3️⃣ Confirmation email to user
    await resend.emails.send({
      from: "Ashrafi Graphics <no-reply@ashrafigraphic.com>",
      to: email,
      subject: "Thank you for contacting Ashrafi Graphics",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out to <strong>Ashrafi Graphics</strong>! We’ve received your message and will respond shortly.</p>
        <p><strong>Your message:</strong></p>
        <div style="border-left:4px solid #007bff;padding:10px;">${message}</div>
        <br>
        <p>Warm regards,<br>Team Ashrafi Graphics</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "✅ Message sent successfully!",
      data: savedContact,
    });
  } catch (error) {
    console.error("❌ Contact error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while sending message.",
      error: error.message,
    });
  }
});

module.exports = router;
