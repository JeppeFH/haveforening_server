import express from "express";
import { signInUser, signInAdmin } from "../handlers/auth.handler.js";

const authRoute = express.Router();

authRoute.post("/auth/signin", async (req, res) => {
  try {
    // Prøver(try) user-login først
    const resultUser = await signInUser(req.body);

    if (resultUser.status === "ok") {
      return res.status(200).json(resultUser);
    }

    // Hvis user ikke kan findes prøves der admin
    const resultAdmin = await signInAdmin(req.body);

    if (resultAdmin.status === "ok") {
      return res.status(200).json(resultAdmin);
    }

    // Hvis ingen af dem virker returnere error(fejl)
    return res.status(401).json({
      status: "error",
      message: "Login mislykkedes.",
    });
  } catch (error) {
    console.error("Unexpected error during sign-in:", error);
    return res.status(500).json({
      status: "error",
      message: "Unexpected server error",
    });
  }
});

export default authRoute;
