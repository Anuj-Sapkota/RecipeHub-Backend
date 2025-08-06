import Favorite from "../models/Favourite.js";

export const addFavorite = async (req, res) => {
  const userId = req.user_id;
  const { recipeId } = req.params;

  try {
    const favorite = await Favorite.create({ user: userId, recipe: recipeId });
    res.status(201).json(favorite);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already favorited" });
    }
    res
      .status(500)
      .json({ message: "Failed to add favorite", error: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  const userId = req.user_id;
  const { recipeId } = req.params;
  try {
    const deleted = await Favorite.findOneAndDelete({
      user: userId,
      recipe: recipeId,
    });
    if (!deleted)
      return res.status(404).json({ message: "Favorite not found." });
    res.json({ message: "Favorite removed." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove favorite", error: err.message });
  }
}; 

export const getAllFavorites = async (req, res) => {
  const userId = req.user._id;

  try {
    const favorites = await Favorite.find({ user: userId }).populate("recipe");
    res.json(favorites);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch favorites", error: err.message });
  }
};


export const isFavorited = async (req,res)=>{
    const userId = req.user._id;
    const {recipeId} = req.params;

    try {
        const exists = await Favorite.exists({ user: userId, recipe: recipeId});
        res.json({ favorited: !!exists});
            }catch (err) {
                res.status(500).json({ message: "Error checking favorite status", error: err.message});
            }
        };