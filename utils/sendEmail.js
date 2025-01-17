const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  try {
    // Create Email Transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
      tls: {
        rejectUnauthorized: false, // Allows self-signed certificates
      },
    });

    // Email options
    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject: subject,
      html: message,
    };

    // Send email
    const info = await transporter.sendMail(options);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email. Please check your configuration.");
  }
};

module.exports = sendEmail;
