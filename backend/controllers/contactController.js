// backend/controllers/contactController.js
const Contact = require("../models/Contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Create new contact submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    // 1️⃣ Save to MongoDB
    const contact = new Contact({
      name,
      email,
      subject: subject || "No Subject",
      message,
      createdAt: new Date(),
    });

    await contact.save();
    console.log("✅ Contact saved:", email);

    // 2️⃣ Email to Admin (notification)
    try {
      await resend.emails.send({
        from: "Ashrafi Graphics <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Message - ${subject || "No Subject"}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 15px;">
            <h2>📩 New Contact Message</h2>
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
      console.error("❌ Failed to send admin email:", err.message);
    }

    // 3️⃣ Auto-reply to User (confirmation)
    try {
      await resend.emails.send({
        from: "Ashrafi Graphics <onboarding@resend.dev>",
        to: email,
        subject: "Thank you for contacting Ashrafi Graphics",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 15px;">
            <h2>Hi ${name},</h2>
            <p>Thank you for reaching out to <strong>Ashrafi Graphics</strong>!</p>
            <p>We’ve received your message and will get back to you soon.</p>
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
      console.error("❌ Failed to send confirmation email:", err.message);
    }

    res.status(201).json({
      success: true,
      message: "✅ Message sent successfully! We'll get back to you soon.",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Contact error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error submitting form. Please try again.",
      error: error.message,
    });
  }
};

// ✅ Get all contact submissions (for admin)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
      error: error.message,
    });
  }
};
