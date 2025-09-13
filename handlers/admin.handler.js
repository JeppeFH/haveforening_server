import adminModel from "../models/admin.model.js";
import dbConnect from "../dbConnect.js";
import bcrypt from "bcryptjs";

export const getAdmins = async () => {
  try {
    await dbConnect();
    const admins = await adminModel.find({});
    return admins;
  } catch (error) {
    throw new Error("Kunne ikke hente admins: " + error.message);
  }
};

export const getAdminById = async (id) => {
  try {
    await dbConnect();
    const admin = await adminModel.findById(id);
    return admin;
  } catch (error) {
    throw new Error("Kunne ikke finde admin: " + error.message);
  }
};

export const createAdmin = async (body) => {
  try {
    await dbConnect();

    /* Hasher password hvis det findes */
    if (body.password) {
      const newHashedPassword = await bcrypt.hash(body.password, 10);
      body.hashedPassword = newHashedPassword;
      delete body.password;
    }

    const admin = await adminModel.create(body);
    return admin;
  } catch (error) {
    throw new Error("Oprettelse af admin fejlede: " + error.message);
  }
};

export const updateAdmin = async (admin) => {
  try {
    await dbConnect();

    const updateData = {
      name: admin.name,
      email: admin.email,
      role: admin.role,
      image: admin.image,
      address: admin.address,
      phonenumber: admin.phonenumber,
    };

    if (admin.password) {
      const newHashedPassword = await bcrypt.hash(admin.password, 10); // Hvis der er et password, bliver det hashet (krypteret) med bcrypt
      updateData.hashedPassword = newHashedPassword; // Gem værdien fra variablen hashedPassword (den nye hash) ind i egenskaben hashedPassword på objektet updateData
    }

    const updatedAdmin = await adminModel.findByIdAndUpdate(
      admin.id,
      updateData,
      { new: true } // betyder at funktionen returnerer det opdaterede dokument. Hvis man ikke satte new: true, ville den returnere det gamle dokument før opdateringen.
    );

    return updatedAdmin;
  } catch (error) {
    throw new Error("Fejl under opdatering: " + error.message);
  }
};

export const deleteAdmin = async (id) => {
  try {
    await dbConnect();
    const deletedAdmin = await adminModel.findByIdAndDelete(id);
    return deletedAdmin;
  } catch (error) {
    throw new Error("Sletning af admin fejlede: " + error.message);
  }
};
