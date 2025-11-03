const Contact = require("../models/Contact");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

// Create new contact submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send thank-you email to user
    await resend.emails.send({
      from: `Ashrafi Graphic <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: `Thank You for Contacting Ashrafi Graphic`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Hi ${name},</h2>
          <p>Thank you for reaching out to us! We have received your message:</p>
          <blockquote>${message}</blockquote>
          <p>We'll get back to you soon.</p>
          <p>— Team Ashrafi Graphic</p>
        </div>
      `
    });

    // Send admin notification
    await resend.emails.send({
      from: `Ashrafi Graphic <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Contact Submission from ${name}`,
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>New Contact Submission</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b> ${message}</p>
        </div>
      `
    });

    res.status(201).json({
      success: true,
      message: "✅ Message sent successfully!",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Contact Form Error:", error);
    res.status(500).json({ success: false, message: "Error submitting form" });
  }
};
