import userModel from "../models/user.model.js";
import dbConnect from "../dbConnect.js";
import bcrypt from "bcryptjs";

export const getUsers = async () => {
  try {
    await dbConnect();
    const users = await userModel.find({});
    return users;
  } catch (error) {
    throw new Error("Kunne ikke hente brugere: " + error.message);
  }
};

export const getUserById = async (id) => {
  try {
    await dbConnect();
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    throw new Error("Kunne ikke finde bruger: " + error.message);
  }
};

export const createUser = async (body) => {
  try {
    await dbConnect();

    if (body.password) {
      const newHashedPassword = await bcrypt.hash(body.password, 10);
      body.hashedPassword = newHashedPassword;
      delete body.password;
    }

    const user = await userModel.create(body);
    return user;
  } catch (error) {
    throw new Error("Oprettelse af bruger fejlede: " + error.message);
  }
};

export const updateUser = async (user) => {
  try {
    await dbConnect();

    const updateData = {
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      phonenumber: user.phonenumber,
      address: user.address,
      joined: user.joined,
    };

    if (user.password) {
      const newHashedPassword = await bcrypt.hash(user.password, 10);
      updateData.hashedPassword = newHashedPassword;
    }

    const updatedUser = await userModel.findByIdAndUpdate(user.id, updateData, {
      new: true,
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Opdatering af bruger fejlede: " + error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    await dbConnect();
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw new Error("Sletning af bruger fejlede: " + error.message);
  }
};
