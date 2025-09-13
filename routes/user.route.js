import express from "express";
import multer from "multer";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../handlers/user.handler.js";

const userRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all users
userRoute.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).send({
      status: "ok",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// GET user by ID
userRoute.get("/user/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    return res.status(200).send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// create user
userRoute.post("/user", upload.single("image"), async (req, res) => {
  try {
    const { name, email, password, role, phonenumber, address, joined } =
      req.body;

    const user = {
      name,
      email,
      password,
      phonenumber,
      address,
      joined,
      role: role || "user",
    };

    if (req.file) {
      user.image = process.env.SERVER_HOST + "/user/" + req.file.filename;
    }

    const result = await createUser(user);
    return res.status(201).send({
      status: "oprettet",
      message: "Bruger oprettet",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// PUT update user
userRoute.put("/user", upload.single("image"), async (req, res) => {
  try {
    const { id, name, email, password, role, phonenumber, address, joined } =
      req.body;

    const user = {
      id,
      name,
      email,
      role,
      phonenumber,
      address,
      joined,
    };

    if (password) {
      user.password = password;
    }

    if (req.file) {
      user.image = process.env.SERVER_HOST + "/user/" + req.file.filename;
    }

    const result = await updateUser(user);
    return res.status(200).send({
      status: "ok",
      message: "Bruger opdateret",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// DELETE user
userRoute.delete("/user/:id", async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    return res.status(200).send({
      status: "ok",
      message: "Bruger slettet",
      data: result?.name,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

export default userRoute;
