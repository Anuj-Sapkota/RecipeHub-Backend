import express from "express";
import recipeController from "../controllers/recipeController.js";

const router = express.Router();

router.post("/", recipeController.createRecipe);

export default router;
