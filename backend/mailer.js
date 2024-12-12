import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, text, html, replyTo = null) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    replyTo: replyTo,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
    // console.log("Email sent: " + info.response);
    return info.response
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendMail;
