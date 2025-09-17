import recipeModel from "../models/Recipe.js";
import userModel from "../models/User.js";
import commentModel from "../models/Comment.js";
import categoryModel from "../models/Category.js";

const getStats = async () => {
  const recipeCount = await recipeModel.countDocuments();
  const usersCount = await userModel.countDocuments();
  const commentsCount = await commentModel.countDocuments();
  const categoriesCount = await categoryModel.countDocuments();
  console.log(recipeCount, usersCount, commentsCount, categoriesCount);
  return { recipeCount, usersCount, commentsCount, categoriesCount };
};

const getAllRecipes = async (page, limit) => {
  const skip = (page - 1) * limit;
  const recipes = await recipeModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("createdBy", "fullName profileImage")
    .populate("category", "name");

  return recipes;
};

export default { getStats, getAllRecipes };
