import categoryModel from "../models/Category.js";
import RecipeModel from "../models/Recipe.js";
import uploadImages from "../utils/file.js";

const create = async (data, file, createdBy) => {
  // generating a filename based on the recipe title
  const rawFileName = data.title;
  // random string for uniqueness in filename
  const randomStr = Math.random().toString(36).substring(2, 7); // 5 chars
  const filename = (rawFileName.replace(/\s+/g, '-') + '-' + randomStr).toLowerCase();
  // uploading the image to cloudinary
  const uploadedImage = await uploadImages(file, filename);
  //checking if the category exists or not
  const categoryExists = await categoryModel.findById(data.category);

  if (!categoryExists) {
    throw new Error("Category not found");
  }

  const createdRecipe = await RecipeModel.create({
    ...data,
    createdBy: createdBy._id,
    image: uploadedImage.secure_url,
  });

  return createdRecipe;
};

export default { create };
