import express from "express";
import recipeController from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", recipeController.getAll);
router.get("/user/:userId", recipeController.getByUser);
router.get("/title/:title", recipeController.getByRecipeTitle);
router.get("/:id", recipeController.getById);
router.post("/", recipeController.createRecipe);

export default router;