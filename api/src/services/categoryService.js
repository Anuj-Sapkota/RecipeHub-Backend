import mongoose from "mongoose";
import Category from "../models/Category.js";
import uploadFile from "../utils/file.js";

const createCategory = async (id, file, data) => {
  let uploadedImage = "";

  if (file) {
    const rawFileName = data.name;
    // random string for uniqueness in filename
    const randomStr = Math.random().toString(36).substring(2, 7);
    //filename generation
    const filename = (
      rawFileName.replace(/\s+/g, "-") +
      "-" +
      randomStr
    ).toLowerCase();
    uploadedImage = await uploadFile(file, filename);
  }

  // Check using the getById function with is to be made.
  const createdCategory = await categoryModel.create({
    ...data,
    image: uploadedImage?.secure_url ?? "",
  });

  return createdCategory;
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

//update category
export const update = async (id, data) => {
  const updatedCategory = await categoryModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedCategory;
};

//delete category
export const deleteCat = async (id, deletedBy) => {
  const deletedCategory = await categoryModel.findByIdAndDelete(id, {
    new: true,
  });
  return deletedCategory;
};

// get category by name
export const getByName = async (title) => {
  const categoryName = await categoryModel.find({
    title: { $regex: title, $options: "i" },
  });
  return categoryName;
};
export default { createCategory, getAllCategories, getCategoryById, getCategoryByName, deleteCategory, updateCategory };
