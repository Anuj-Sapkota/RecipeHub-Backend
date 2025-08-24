import express from "express";
import recipeController from "../controllers/recipeController.js";

const router = express.Router();

// Route to create a new recipe
router.post("/", recipeController.createRecipe);
//Route to update an existing recipe
router.put("/:id", recipeController.updateRecipe);

export default router;
