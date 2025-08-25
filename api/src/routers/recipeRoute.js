import express from "express";
import recipeController from "../controllers/recipeController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", recipeController.createRecipe);

// Rate a recipe (protected)
router.post("/:id/rate", auth, recipeController.rateRecipe);

// Get recipe by id
router.get("/:id", recipeController.getRecipeById);

export default router;
