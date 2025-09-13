import adItemModel from "../models/adItem.model.js";
import dbConnect from "../dbConnect.js";

/* Get all */
export const getAdItems = async () => {
  try {
    await dbConnect();
    const adItems = await adItemModel.find({});
    return adItems;
  } catch (error) {
    throw new Error("Der skete en fejl", error);
  }
};

// Create
export const createAdItem = async (body) => {
  try {
    await dbConnect();
    const adItem = await adItemModel.create(body);
    return adItem;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl", error);
  }
};

// Update
export const updateAdItem = async (body) => {
  try {
    await dbConnect();
    const adItem = await adItemModel.findById(body.id);

    if (!adItem) {
      throw new Error("Der skete en fejl:", error);
    }

    const { id, ...updateData } = body;

    const updatedAdItem = await adItemModel.findByIdAndUpdate(id, updateData);

    return updatedAdItem;
  } catch (error) {
    throw new Error("Opdatering af ejendom fejlede: " + error.message);
  }
};

// Delete
export const deleteAdItem = async (id) => {
  try {
    await dbConnect();
    const deleteAdItem = await adItemModel.findByIdAndDelete(id);
    return deleteAdItem;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af ejendom:", error);
  }
};

// Get by ID
/* populate() er en method fra Mongoose som gør at man kan slå data op på tværs af scripts.
  F.eks. hvis et adItem har et user-felt (ObjectId), kan man bruge .populate("user") 
  til automatisk at hente brugerens navn, email, address, osv. i samme query,
  uden at man skal lave flere databasekald. */
export const getAdItemById = async (id) => {
  try {
    await dbConnect();
    const adItem = await adItemModel
      .findById(id)
      .populate("user", "name email phonenumber image address joined");
    return adItem;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};
