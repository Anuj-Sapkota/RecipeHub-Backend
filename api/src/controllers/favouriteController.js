import {
  addFavoriteService,
  removeFavoriteService,
  getFavoritesService,
  checkFavoriteService,
} from "../services/favoriteService.js";

export const addFavorite = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { recipeId } = req.params;
    const favorite = await addFavoriteService(userId, recipeId);
    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { recipeId } = req.params;
    await removeFavoriteService(userId, recipeId);
    res.status(200).json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const favorites = await getFavoritesService(userId);
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const checkFavorite = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { recipeId } = req.params;
    const exists = await checkFavoriteService(userId, recipeId);
    res.status(200).json({ favorited: exists });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
