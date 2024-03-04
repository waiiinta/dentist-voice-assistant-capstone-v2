import nodemailer from "nodemailer"
import env from "../config/config.js"

const sendEmail = async (options) => {
  // 1) Create a transporter

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host:"stmp.gmail.com",
    port:586,
    secure:false,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD,
    },
  });


  // 2) Define the email options
  const mailOptions = {
    from: "noreply.host.dentist@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    attachments: options.attachments,
    html: options.html,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail
