import mongoose from "mongoose";
import Category from "../models/Category.js";
import uploadFile from "../utils/file.js";

const createCategory = async (paramId, file, payload) => {

  let uploadedImage = "";

  if (file) {
    const rawFileName = payload.name || payload.title || "category";
    // random string for uniqueness in filename
    const randomStr = Math.random().toString(36).substring(2, 7);
    // filename generation
    const filename = (rawFileName.replace(/\s+/g, "-") + "-" + randomStr).toLowerCase();
    uploadedImage = await uploadFile(file, filename);
  }

  // create and persist category, storing uploaded image URL if present
  const createdCategory = await Category.create({
    ...payload,
    image: uploadedImage?.secure_url ?? "",
  });

  return createdCategory;

  const category = new Category(payload);
  const saved = await category.save();
  
  return saved;

};

const getAllCategories = async () => {
  
  return Category.find().sort({ createdAt: -1 }).lean();
};

const getCategoryById = async (id) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {

    return null;
  }

  return Category.findById(id).lean();
};

export default { createCategory, getAllCategories, getCategoryById };
