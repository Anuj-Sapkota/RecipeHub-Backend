import mongoose from "mongoose";
import Favorite from "../models/Favorite.js";
// Optional: check recipe exists before favoriting
// import Recipe from "../models/recipeModel.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST /api/favorites/:recipeId
export const addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user?.id || req.user?._id; // depends on auth middleware

    if (!isValidObjectId(recipeId)) {
      return res.status(400).json({ message: "Invalid recipeId" });
    }

    // Optional: check recipe exists
    // const recipeExists = await Recipe.findById(recipeId);
    // if (!recipeExists) return res.status(404).json({ message: "Recipe not found" });

    const already = await Favorite.findOne({ userId, recipeId });
    if (already) return res.status(400).json({ message: "Recipe already favorited" });

    const favorite = await Favorite.create({ userId, recipeId });
    // populate the recipeId to return recipe data (optional)
    await favorite.populate("recipeId").execPopulate?.() ; // for mongoose v5 compatibility
    const populated = await Favorite.findById(favorite._id).populate("recipeId");
    res.status(201).json(populated);
  } catch (err) {
    // duplicate key error handling (in case of race)
    if (err.code === 11000) {
      return res.status(400).json({ message: "Recipe already favorited" });
    }
    console.error("addFavorite error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /api/favorites/:recipeId
export const removeFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user?.id || req.user?._id;

    if (!isValidObjectId(recipeId)) {
      return res.status(400).json({ message: "Invalid recipeId" });
    }

    const removed = await Favorite.findOneAndDelete({ userId, recipeId });
    if (!removed) return res.status(404).json({ message: "Favorite not found" });

    res.status(200).json({ message: "Removed from favorites" });
  } catch (err) {
    console.error("removeFavorite error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/favorites
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 }).populate("recipeId");
    res.status(200).json(favorites);
  } catch (err) {
    console.error("getFavorites error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/favorites/:recipeId  (check if favorited)
export const checkFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user?.id || req.user?._id;

    if (!isValidObjectId(recipeId)) {
      return res.status(400).json({ message: "Invalid recipeId" });
    }

    const exists = await Favorite.findOne({ userId, recipeId });
    res.status(200).json({ favorited: !!exists });
  } catch (err) {
    console.error("checkFavorite error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
