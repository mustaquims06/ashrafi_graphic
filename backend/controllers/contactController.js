const Contact = require("../models/Contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({ name, email, subject, message });

    // Send notification to Admin
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Contact from ${name}`,
      html: `
        <div style="font-family:Arial; padding:20px;">
          <h2>New Contact Submission</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b><br/>${message}</p>
        </div>
      `
    });

    // Auto reply to user
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "✅ We received your message - Ashrafi Graphics",
      html: `
        <div style="font-family:Arial; padding:20px;">
          <h2>Thank you, ${name}!</h2>
          <p>We’ve received your message and will get back to you soon.</p>
          <p>– Ashrafi Graphics Team</p>
        </div>
      `
    });

    res.status(201).json({ success: true, message: "Message sent successfully" });

  } catch (error) {
    console.error("❌ Contact error:", error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
};
