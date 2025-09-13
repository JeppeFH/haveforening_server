import express from "express";
import multer from "multer";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyById,
} from "../handlers/property.handler.js";

const propertyRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/property");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all properties
propertyRoute.get("/properties", async (req, res) => {
  try {
    const properties = await getProperties();
    return res.status(200).send({
      status: "ok",
      message: "Ejendom hentet",
      data: properties,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// GET property by ID
propertyRoute.get("/property/:id", async (req, res) => {
  try {
    const property = await getPropertyById(req.params.id);
    return res.status(200).send({
      status: "ok",
      data: property,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// POST create property
propertyRoute.post("/property", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      address,
      setForSaleDate,
      bedrooms,
      bathroom,
      houseSize,
      appliances,
      mail,
      phoneNumber,
      price,
    } = req.body;

    const property = {
      name,
      address,
      setForSaleDate,
      bedrooms,
      bathroom,
      houseSize,
      appliances,
      mail,
      phoneNumber,
      price,
    };

    if (req.file) {
      property.image =
        process.env.SERVER_HOST + "/property/" + req.file.filename;
    }

    const result = await createProperty(property);

    return res.status(201).send({
      status: "oprettet",
      message: "Ejendom oprettet",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// PUT update property
propertyRoute.put("/property", upload.single("image"), async (req, res) => {
  try {
    const {
      id,
      name,
      address,
      setForSaleDate,
      bedrooms,
      bathroom,
      houseSize,
      appliances,
      mail,
      phoneNumber,
      price,
    } = req.body;

    const property = {
      id,
      name,
      address,
      setForSaleDate,
      bedrooms,
      bathroom,
      houseSize,
      appliances,
      mail,
      phoneNumber,
      price,
    };

    if (req.file) {
      property.image =
        process.env.SERVER_HOST + "/property/" + req.file.filename;
    }

    const result = await updateProperty(property);

    return res.status(200).send({
      status: "ok",
      message: "Ejendom opdateret",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// DELETE property
propertyRoute.delete("/property/:id", async (req, res) => {
  try {
    const result = await deleteProperty(req.params.id);

    return res.status(200).send({
      status: "ok",
      message: "Ejendom slettet",
      data: result.title,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

export default propertyRoute;
