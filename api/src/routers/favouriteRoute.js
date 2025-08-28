import express from "express";
import auth from "../middlewares/auth.js";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  checkFavorite,
} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/:recipeId", auth, addFavorite);
router.delete("/:recipeId", auth, removeFavorite);
router.get("/", auth, getFavorites);
router.get("/:recipeId", auth, checkFavorite);

export default router;
