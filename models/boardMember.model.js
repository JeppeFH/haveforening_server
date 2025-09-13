import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const boardMemberSchema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
});

export default mongoose.models.boardMember ||
  mongoose.model("boardMember", boardMemberSchema);
