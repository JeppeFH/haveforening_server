import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html, text }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // From .env.local
      pass: process.env.EMAIL_PASS, // From .env.local
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    text,
  });
}
