const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendEmail = (options) => {
  // 1) Create a transporter :
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define the email options :
  const mailOptions = {
    from: "Croissant Rouge Tunisie Nabeul<croissantrouge792@gmail.com>",
    to: options.email,
    cc: options.cc,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  };
  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
