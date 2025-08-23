import express from "express";
import recipeController from "../controllers/recipeController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", recipeController.createRecipe);

// // Route to rate a recipe (protected)
router.post("/:id/rate", auth, recipeController.rateRecipe);

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Get recipe by id
router.get("/:id", recipeController.getRecipeById);

// Get recipes by user (protected)
router.get("/user/me", auth, recipeController.getRecipesByUser);

// Get recipe by name
router.get("/name/:name", recipeController.getRecipeByName);

export default router;