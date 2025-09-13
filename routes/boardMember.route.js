import express from "express";
import multer from "multer";
import {
  getBoardMembers,
  createBoardMember,
  updateBoardMember,
  deleteBoardMember,
  getBoardMemberById,
} from "../handlers/boardMember.handler.js";

const boardRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/boardMembers");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all
boardRoute.get("/boardmembers", async (req, res) => {
  try {
    const boardMembers = await getBoardMembers();
    return res.status(200).send({
      status: "ok",
      message: "Bestyrelsesmedlem hentet",
      data: boardMembers,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// GET by ID
boardRoute.get("/boardmember/:id", async (req, res) => {
  try {
    const boardMember = await getBoardMemberById(req.params.id);
    return res.status(200).send({
      status: "ok",
      data: boardMember,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// POST create
boardRoute.post("/boardmember", upload.single("image"), async (req, res) => {
  try {
    const { name, position, email, phoneNumber } = req.body;

    const boardMember = {
      name,
      position,
      email,
      phoneNumber,
    };

    if (req.file) {
      boardMember.image =
        process.env.SERVER_HOST + "/boardMembers/" + req.file.filename;
    }

    const result = await createBoardMember(boardMember);

    return res.status(201).send({
      status: "oprettet",
      message: "Bestyrelsesmedlem oprettet",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// PUT update
boardRoute.put("/boardmembers", upload.single("image"), async (req, res) => {
  try {
    const { id, name, position, email, phoneNumber } = req.body;

    const boardMember = {
      id,
      name,
      position,
      email,
      phoneNumber,
    };

    if (req.file) {
      boardMember.image =
        process.env.SERVER_HOST + "/boardMembers/" + req.file.filename;
    }

    const result = await updateBoardMember(boardMember);

    return res.status(200).send({
      status: "ok",
      message: "Bestyrelsesmedlem opdateret",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// DELETE
boardRoute.delete("/boardmember/:id", async (req, res) => {
  try {
    const result = await deleteBoardMember(req.params.id);

    return res.status(200).send({
      status: "ok",
      message: "Bestyrelsesmedlem opdateret",
      data: result.title,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

export default boardRoute;
