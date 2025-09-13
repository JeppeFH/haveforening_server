import express from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import adminModel from "../models/admin.model.js";

const resetPasswordRoute = express.Router();

resetPasswordRoute.post("/auth/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    /* Prøver at finde users eller admins */
    let user =
      (await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      })) ||
      (await adminModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      }));

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    /* Opdatere adgangskode */
    user.hashedPassword = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password updated succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
});

export default resetPasswordRoute;
