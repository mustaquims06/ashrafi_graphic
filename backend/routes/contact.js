// backend/routes/contact.js
const express = require("express");
const router = express.Router();
const { Resend } = require("resend");
const Contact = require("../models/Contact");

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ POST: /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    // Save message to MongoDB
    const newContact = new Contact({
      name,
      email,
      subject: subject || "No Subject",
      message,
      createdAt: new Date(),
    });

    const savedContact = await newContact.save();
    console.log("✅ Contact saved:", savedContact.email);

    // 📨 Email to Admin
    try {
      await resend.emails.send({
        from: "Ashrafi Graphics <noreply@ashrafigraphic.com>",
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form - ${subject || "No Subject"}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 15px;">
            <h2>📬 New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left:4px solid #007bff;padding-left:10px;">
              ${message}
            </blockquote>
          </div>
        `,
      });

      console.log("✅ Admin email sent to:", process.env.ADMIN_EMAIL);
    } catch (err) {
      console.error("❌ Admin email send failed:", err.message);
    }

    // 📨 Auto-reply to User
    try {
      await resend.emails.send({
        from: "Ashrafi Graphics <noreply@ashrafigraphic.com>",
        to: email,
        subject: "Thank you for contacting Ashrafi Graphics",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 15px;">
            <h2>Hi ${name},</h2>
            <p>Thank you for reaching out to <strong>Ashrafi Graphics</strong>!</p>
            <p>We have received your message and will get back to you shortly.</p>
            <hr>
            <p><strong>Your message:</strong></p>
            <blockquote style="border-left:4px solid #22c55e;padding-left:10px;">
              ${message}
            </blockquote>
            <p style="margin-top:20px;">Warm regards,<br><strong>Team Ashrafi Graphics</strong></p>
          </div>
        `,
      });

      console.log("✅ Confirmation email sent to:", email);
    } catch (err) {
      console.error("❌ User email send failed:", err.message);
    }

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
