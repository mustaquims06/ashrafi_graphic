const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email using universal config
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - html content
 */
const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
      to,
      reply_to: process.env.EMAIL_REPLY_TO,
      subject,
      html,
    });
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
  }
};

module.exports = sendEmail;
