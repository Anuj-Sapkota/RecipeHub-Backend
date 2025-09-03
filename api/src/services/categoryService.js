
import categoryModel from "../models/Category.js";
import uploadImages from "../utils/file.js";
import cloudinary from "cloudinary";
// create category
export const createCategory = async (data, file) => {
  const category = await categoryModel.create({
    ...data,
    image: { url: "", public_id: "" }, // placeholder
  });

  // uploading the image with category._id as the filename
  if (file) {
    const filename = category._id.toString(); 
    const uploadedImage = await uploadImages(file, filename);

    // update category with Cloudinary info
    category.image = {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    };
    await category.save();
  }

  return category;
};


const getAllCategories = async () => {
  const categories = await categoryModel.find().sort({ createdAt: -1 }).lean();

  if (categories.length === 0) {
    throw new Error("No categories found");
  }

  return categories;
};

const getCategoryById = async (id) => {
  const category = await categoryModel.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

//update category
export const updateCategory = async (id, file, data) => {
  const category = await getCategoryById(id);

  let uploadedImage = "";

  if (file) {

    //delete the old image from cloudinary
    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }
    
    //taking the name from the name
    const filename = category._id.toString();
    uploadedImage = await uploadImages(file, filename);
  }

  const updatedCategory = await categoryModel.findByIdAndUpdate(
    id,
    {
      ...data,
    image: uploadedImage
        ? { url: uploadedImage.secure_url, public_id: uploadedImage.public_id }
        : category.image, 
    },
    { new: true }
  );

  return updatedCategory;
};

//delete category
export const deleteCategory = async (id) => {
  const category = await getCategoryById(id);

  //delete image from cloudinary id exists
  if (category.image?.public_id) {
    await cloudinary.uploader.destroy(category.image.public_id);
  }

  const deletedCategory = await categoryModel.findByIdAndDelete(id);

  return deletedCategory;
};

// get category by name
export const getByName = async (name) => {
  const category = await categoryModel.find({
    name: { $regex: `^${name}`, $options: "i" },
  });

  if (category.length === 0) {
    throw new Error("No categories found");
  }

  return category;
};
export default {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getByName,
};
