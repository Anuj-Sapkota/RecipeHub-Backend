import express from "express";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  checkFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

// Important: define list route first so GET / won't be treated as /:recipeId
router.get("/", getFavorites);
router.get("/:recipeId", checkFavorite);

router.post("/:recipeId", addFavorite);
router.delete("/:recipeId", removeFavorite);

export default router;
