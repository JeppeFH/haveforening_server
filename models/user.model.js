import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String },
  hashedPassword: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  phonenumber: { type: String, required: true },
  address: { type: String, required: true },
  joined: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
