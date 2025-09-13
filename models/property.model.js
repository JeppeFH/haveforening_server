import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const propertySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  setForSaleDate: { type: String },
  bedrooms: { type: String },
  bathroom: { type: String },
  houseSize: { type: String },
  appliances: { type: String },
  mail: { type: String },
  phoneNumber: { type: String },
  image: { type: String },
  price: { type: Number },
});

export default mongoose.models.property ||
  mongoose.model("property", propertySchema);
