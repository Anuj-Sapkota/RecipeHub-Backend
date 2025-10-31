import express from "express";
import recipeController from "../controllers/recipeController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", recipeController.createRecipe);

// Rate a recipe (protected)
router.post("/:id/rate", auth, recipeController.rateRecipe);

//Update a recipe
router.put("/:id", recipeController.updateRecipe);

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Get recipes by user (protected)
router.get("/user/:name", auth, recipeController.getByUser);

// Get recipe by name
router.get("/name/:name", recipeController.getByName);

//get the logged in user created recipes
router.get("/me", auth, recipeController.getCurrentUserRecipes);

// get the top 5 recipes with greatest ratings
router.get("/top", recipeController.getTopRecipes);

// Get recipe by id
router.get("/:id", recipeController.getRecipeById);

//delete recipe
router.delete("/:id", auth, recipeController.deleteRecipe);



export default router;
