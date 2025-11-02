// backend/controllers/contactController.js
const Contact = require("../models/Contact");
const resend = require("../config/transporter"); // Resend instance

// Create new contact submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: "Email and message are required.",
      });
    }

    // Save contact in DB
    const contact = await Contact.create({ name, email, subject, message });

    // Admin & user emails
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "ashrafigraphicservices@gmail.com";

    // 📩 Admin notification email
    const adminEmailHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>📥 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "(none)"}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f9f9f9; padding: 10px; border-radius: 8px;">
          ${message}
        </p>
        <hr/>
        <p style="color:#777;">Sent via Ashrafi Graphic Website</p>
      </div>
    `;

    // 📧 User confirmation email
    const userEmailHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Thank you for contacting Ashrafi Graphics!</h2>
        <p>Hi ${name || "there"},</p>
        <p>We’ve received your message:</p>
        <blockquote style="color:#555; border-left: 3px solid #FFD700; padding-left: 10px;">
          ${message}
        </blockquote>
        <p>Our team will review your request and get back to you shortly.</p>
        <p>Warm regards,<br/>Team Ashrafi Graphics 💛</p>
      </div>
    `;

    // ✅ Send both emails via Resend
    const results = await Promise.all([
      resend.emails.send({
        from: "Ashrafi Graphics <no-reply@ashrafigraphic.com>",
        to: ADMIN_EMAIL,
        subject: `📩 New Contact Message - ${subject || "No Subject"}`,
        html: adminEmailHTML,
      }),
      resend.emails.send({
        from: "Ashrafi Graphics <no-reply@ashrafigraphic.com>",
        to: email,
        subject: "✅ We’ve received your message",
        html: userEmailHTML,
      }),
    ]);

    console.log("✅ Contact emails sent:", results);

    res.status(201).json({
      success: true,
      message: "Message submitted successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting form. Please try again later.",
      error: error.message,
    });
  }
};

// Get all contact submissions (for admin)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
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
