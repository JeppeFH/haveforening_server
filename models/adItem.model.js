import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const adItemSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  image: [{ type: String }], // [ ], ændrer det til et array af strenge (flere billeder)
  price: { type: Number },
  date: { type: String },
  condition: { type: String },
  shipment: { type: String },
  width: { type: String },
  length: { type: String },
  height: { type: String },

  /* linker til userschema (user.model.js) til at kunne connecte en user til en annonce  */
  /* Dette felt (user) er en ObjectId, som refererer til modellen der hedder user. */
  /* Mongoose-biblioteket holder selv styr på referencen, så længe der findes et model med navnet "user" */
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

export default mongoose.models.adItem || mongoose.model("adItem", adItemSchema);
