/* læser miljøvariabler ind fra .env.local så process.env.CLIENT_URL og andre variabler ikke bliver undefined */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import propertyRoute from "./routes/property.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import newsRoute from "./routes/news.route.js";
import boardRoute from "./routes/boardMember.route.js";
import forgotPasswordRoute from "./routes/forgotPassword.route.js";
import resetPasswordRoute from "./routes/resetPassword.route.js";
import adItemRoute from "./routes/adItem.route.js";

/* Server */
const expressServer = express();

/* Tillader request fra forskellige porte */
expressServer.use(cors());

/* Gør alle filer offentligt tilgængelige (servér dem fra serveren som de er */
expressServer.use(express.static("uploads"));

/* For at kunne læse req.body i JSON */
expressServer.use(express.json());

// Routes
expressServer.use(propertyRoute);
expressServer.use(userRoute);
expressServer.use(adminRoute);
expressServer.use(authRoute);
expressServer.use(newsRoute);
expressServer.use(boardRoute);
expressServer.use(forgotPasswordRoute);
expressServer.use(resetPasswordRoute);
expressServer.use(adItemRoute);

expressServer.listen(3043, () => {
  console.log("serveren kører på http://localhost:3043");
});
