const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // for testing only - remove in production
  }
});

// Test email connection
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email setup error:", error);
  } else {
    console.log("Email server is ready!");
  }
});

router.post("/apply", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required."
      });
    }

    // 1. Save to MongoDB
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    });

    const savedContact = await newContact.save();
    console.log("Contact saved to DB:", savedContact);

    // 2. Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #fff; padding: 15px; border-left: 4px solid #007bff;">
              ${message}
            </p>
          </div>
        </div>
      `
    };

    // 3. Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Ashrafi Graphics",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You for Contacting Us!</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Ashrafi Graphics. We have received your message and will get back to you as soon as possible.</p>
            <p>For your reference, here's what you sent us:</p>
            <div style="background: #fff; padding: 15px; border-left: 4px solid #007bff;">
              <p><strong>Subject:</strong> ${subject || 'Not specified'}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
            <p>Best regards,<br>Team Ashrafi Graphics</p>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log("Emails sent successfully");

    // 4. Send success response
    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
      data: savedContact
    });

  } catch (error) {
    console.error("Error in contact form:", error);
    res.status(500).json({
      success: false,
      message: "Error processing your request. Please try again.",
      error: error.message
    });
  }
});

module.exports = router;