import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  imageUrl: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
