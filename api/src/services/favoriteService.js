import mongoose from "mongoose";
import Favorite from "../models/Favorite.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const addFavoriteService = async (userId, recipeId) => {
  if (!isValidObjectId(recipeId)) throw new Error("Invalid recipeId");

  const already = await Favorite.findOne({ userId, recipeId });
  if (already) throw new Error("Recipe already favorited");

  const favorite = await Favorite.create({ userId, recipeId });
  return Favorite.findById(favorite._id).populate("recipeId");
};

export const removeFavoriteService = async (userId, recipeId) => {
  if (!isValidObjectId(recipeId)) throw new Error("Invalid recipeId");

  const removed = await Favorite.findOneAndDelete({ userId, recipeId });
  if (!removed) throw new Error("Favorite not found");

  return removed;
};

export const getFavoritesService = async (userId) => {
  return Favorite.find({ userId }).sort({ createdAt: -1 }).populate("recipeId");
};

export const checkFavoriteService = async (userId, recipeId) => {
  if (!isValidObjectId(recipeId)) throw new Error("Invalid recipeId");

  const exists = await Favorite.findOne({ userId, recipeId });
  return !!exists;
};
