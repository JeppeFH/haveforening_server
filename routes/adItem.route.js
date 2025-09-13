import express from "express";
import multer from "multer";
import {
  getAdItems,
  createAdItem,
  updateAdItem,
} from "../handlers/adItem.handler.js";
import auth from "../middleware/auth.middleware.js";
import adItemModel from "../models/adItem.model.js";
import dbConnect from "../dbConnect.js";

const adItemRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/adItem");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all
adItemRoute.get("/adItems", async (req, res) => {
  try {
    await dbConnect();
    const adItems = await adItemModel
      .find()
      .populate("user", "email address name image phonenumber joined");

    return res.status(200).send({
      status: "ok",
      message: "annoncer hentet",
      data: adItems,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// GET by ID
adItemRoute.get("/adItem/:id", async (req, res) => {
  try {
    await dbConnect();
    const adItem = await adItemModel
      .findById(req.params.id)
      .populate("user", "email address name image phonenumber joined");
    return res.status(200).send({
      status: "ok",
      data: adItem,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// POST create
adItemRoute.post(
  "/adItem",
  auth,
  upload.array("image", 4),
  async (req, res) => {
    try {
      const {
        title,
        category,
        description,
        price,
        date,
        condition,
        shipment,
        width,
        length,
        height,
      } = req.body;

      const adItem = {
        title,
        category,
        description,
        price,
        date,
        condition,
        shipment,
        width,
        length,
        height,
        user: req.user._id, // kobler annoncen til logged-in user id
      };

      if (req.files && req.files.length > 0) {
        adItem.image = req.files.map(
          (file) => process.env.SERVER_HOST + "/adItem/" + file.filename
        );
      }

      // Opretter annonce
      let result = await createAdItem(adItem);

      // Populate() user inden retur
      result = await adItemModel
        .findById(result._id)
        .populate("user", "email address name phonenumber image joined");

      console.log("AD ITEM med populated user:", result);

      return res.status(201).send({
        status: "oprettet",
        message: "Annonce oprettet",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  }
);

// PUT update
adItemRoute.put("/adItem", auth, upload.single("image"), async (req, res) => {
  try {
    const {
      id,
      title,
      category,
      description,
      price,
      date,
      condition,
      shipment,
      width,
      length,
      height,
    } = req.body;

    const adItem = {
      id,
      title,
      category,
      description,
      price,
      date,
      condition,
      shipment,
      width,
      length,
      height,
      user: req.user._id,
    };

    if (req.file) {
      adItem.image = process.env.SERVER_HOST + "/adItem/" + req.file.filename;
    }

    const result = await updateAdItem(adItem);

    return res.status(200).send({
      status: "ok",
      message: "Annonce opdateret",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// DELETE - kun ejeren kan slette
adItemRoute.delete("/adItem/:id", async (req, res) => {
  try {
    const adItem = await adItemModel.findById(req.params.id);

    if (!adItem) {
      return res.status(404).send({
        status: "error",
        message: "Annonce ikke fundet",
      });
    }

    /* Tjekker om user (bruger) "ejer" annoncen */
    if (adItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        status: "error",
        message: "Du har ikke rettigheder til at slette denne annonce",
      });
    }

    await adItem.deleteOne();

    return res.status(200).send({
      status: "ok",
      message: "Annonce slettet",
      data: adItem.title,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// Get all ads (annoncer) for en logged-in user
adItemRoute.get("/myAds", auth, async (req, res) => {
  try {
    const adItem = await adItemModel
      .find({ user: req.user._id })
      .populate("user", "email address name image phonenumber joined");

    return res.status(200).send({
      status: "ok",
      data: adItem,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

export default adItemRoute;
