import propertyModel from "../models/property.model.js";
import dbConnect from "../dbConnect.js";

/* Get all properties */
export const getProperties = async () => {
  try {
    await dbConnect();
    const properties = await propertyModel.find({});
    return properties;
  } catch (error) {
    throw new Error("Der skete en fejl", error);
  }
};

// Create Property
export const createProperty = async (body) => {
  try {
    await dbConnect();
    const property = await propertyModel.create(body);
    return property;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl", error); // Throw: Stop alt og smid fejlen videre til route
  }
};

// Update Property
export const updateProperty = async (body) => {
  try {
    await dbConnect();
    const property = await propertyModel.findById(body.id);

    if (!property) {
      throw new Error("Der skete en fejl:", error);
    }

    const { id, ...updateData } = body;

    const updatedProperty = await propertyModel.findByIdAndUpdate(
      id,
      updateData
    );

    return updatedProperty;
  } catch (error) {
    throw new Error("Opdatering af ejendom fejlede: " + error.message);
  }
};

// Delete Property
export const deleteProperty = async (id) => {
  try {
    await dbConnect();
    const deleteProperty = await propertyModel.findByIdAndDelete(id);
    return deleteProperty;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af ejendom:", error);
  }
};

// Get Property by ID
export const getPropertyById = async (id) => {
  try {
    await dbConnect();
    const property = await propertyModel.findById(id);
    return property;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};
