const Contact = require("../models/Contact");
const sendEmail = require("../config/emailService");

// Create new contact message
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ error: "All required fields missing" });

    // Save to DB
    const contact = await Contact.create({ name, email, subject, message });

    // Send confirmation to user
    const userHtml = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Thank You, ${name}!</h2>
        <p>We have received your message:</p>
        <blockquote>${message}</blockquote>
        <p>Our team will reach out to you shortly.</p>
        <p>– Ashrafi Graphics Team</p>
      </div>
    `;

    // Notify admin
    const adminHtml = `
      <div style="font-family: Arial; padding: 20px;">
        <h2>📩 New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject || "No subject"}</p>
        <p><b>Message:</b> ${message}</p>
      </div>
    `;

    await sendEmail(email, "We received your message!", userHtml);
    await sendEmail(process.env.EMAIL_REPLY_TO, `New Contact: ${name}`, adminHtml);

    res.status(201).json({
      success: true,
      message: "Contact message submitted successfully",
      data: contact,
    });
  } catch (err) {
    console.error("❌ Contact error:", err);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
};

// Admin - fetch all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    console.error("❌ Get contacts error:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};
