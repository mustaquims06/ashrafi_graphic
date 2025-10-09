const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: '587',
  port: 587,
  secure: true,
  auth: {
    user: "naiksakshi320@gmail.com", // your business Gmail
    pass: process.env.GMAIL_APP_PASSWORD, // Use environment variable for the app password
  },
});

module.exports = transporter;


