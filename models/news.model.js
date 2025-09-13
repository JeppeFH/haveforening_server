import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const newsSchema = new Schema({
  title: { type: String, required: true },
  info: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String },
});

export default mongoose.models.news || mongoose.model("news", newsSchema);
