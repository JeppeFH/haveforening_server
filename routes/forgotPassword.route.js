import express from "express";
import crypto from "crypto";
import userModel from "../models/user.model.js";
import adminModel from "../models/admin.model.js";
import { sendEmail } from "../nodemailer/mailer.js";

const forgotPasswordRoute = express.Router();

/* Laver et POST-request til backend: */
forgotPasswordRoute.post("/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    /* Prøver at finde user eller admin */
    let user =
      (await userModel.findOne({ email })) ||
      (await adminModel.findOne({ email }));

    if (!user) {
      return res.json({
        message: "If this email exists, a reset link has been sent.",
      });
    }

    /* Laver token & udløbsdato  */
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // Email link udløber efter 1 time

    /* gemmer token og udløbsdatoen i database, så man senere kan bekræfte det under nulstilling af adgangskode.*/
    await user.save();

    /* Laver et reset-link */
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    /* Send email */
    await sendEmail({
      to: email,

      subject: "Nulstil din adgangskode",

      html: `<p>Klik <a href="${resetLink}">her</a> for at nulstille din adgangskode.</p> 
      <p>Dette link vil udløbe om 1 time.</p>`,

      text: `Klik på linket for at nulstille din adgangskode: ${resetLink} \n
             Linket udløber om 1 time.`,
    });

    res.json({ message: "If this email exists, a reset link has been sent." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending reset link" });
  }
});

export default forgotPasswordRoute;
