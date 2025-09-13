import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
  phonenumber: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

export default mongoose.models.admin || mongoose.model("admin", adminSchema);
