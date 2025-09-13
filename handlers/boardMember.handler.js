import boardMemberModel from "../models/boardMember.model.js";
import dbConnect from "../dbConnect.js";

/* Get all  */
export const getBoardMembers = async () => {
  try {
    await dbConnect();
    const boardMembers = await boardMemberModel.find({});
    return boardMembers;
  } catch (error) {
    throw new Error("Der skete en fejl", error);
  }
};

// Create
export const createBoardMember = async (body) => {
  try {
    await dbConnect();
    const boardMember = await boardMemberModel.create(body);
    return boardMember;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl", error);
  }
};

// Update
export const updateBoardMember = async (body) => {
  try {
    await dbConnect();
    const boardMember = await boardMemberModel.findById(body.id);

    if (!boardMember) {
      throw new Error("Der skete en fejl:", error);
    }

    const { id, ...updateData } = body;

    const updatedBoardMember = await boardMemberModel.findByIdAndUpdate(
      id,
      updateData
    );

    return updatedBoardMember;
  } catch (error) {
    throw new Error(
      "Opdatering af Bestyrelsesmedlem fejlede: " + error.message
    );
  }
};

// Delete
export const deleteBoardMember = async (id) => {
  try {
    await dbConnect();
    const deleteBoardMember = await boardMemberModel.findByIdAndDelete(id);
    return deleteBoardMember;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af medlem:", error);
  }
};

// Get by ID
export const getBoardMemberById = async (id) => {
  try {
    await dbConnect();
    const boardMember = await boardMemberModel.findById(id);
    return boardMember;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};
