import express from "express";
import multer from "multer";

import {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../handlers/admin.handler.js";

const adminRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/admin");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all admins
adminRoute.get("/admins", async (req, res) => {
  try {
    const admins = await getAdmins();
    return res.status(200).send({
      status: "ok",
      data: admins,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// GET admin by ID
adminRoute.get("/admin/:id", async (req, res) => {
  try {
    const admin = await getAdminById(req.params.id);
    return res.status(200).send({
      status: "ok",
      data: admin,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// create admin
adminRoute.post("/admin", upload.single("image"), async (req, res) => {
  try {
    const { name, email, password, role, address, phonenumber } = req.body;

    const admin = {
      name,
      email,
      password,
      address,
      phonenumber,
      role: role || "admin",
    };

    if (req.file) {
      admin.image = process.env.SERVER_HOST + "/admin/" + req.file.filename;
    }

    const result = await createAdmin(admin);
    return res.status(201).send({
      status: "oprettet",
      message: "Admin oprettet",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// PUT update admin
adminRoute.put("/admin", upload.single("image"), async (req, res) => {
  try {
    const { id, name, email, password, phonenumber, address, role } = req.body;

    const admin = {
      id,
      name,
      email,
      role,
      address,
      phonenumber,
    };

    if (password) {
      admin.password = password;
    }

    if (req.file) {
      admin.image = process.env.SERVER_HOST + "/admin/" + req.file.filename;
    }

    const result = await updateAdmin(admin);
    return res.status(200).send({
      status: "ok",
      message: "Admin opdateret",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// DELETE admin
adminRoute.delete("/admin/:id", async (req, res) => {
  try {
    const result = await deleteAdmin(req.params.id);
    return res.status(200).send({
      status: "ok",
      message: "Admin slettet",
      data: result?.name,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

export default adminRoute;
