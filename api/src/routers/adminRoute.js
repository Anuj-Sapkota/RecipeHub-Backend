import express from "express";
import adminController from "../controllers/adminController.js";

const router = express.Router();

//count stats
router.get("/stats", adminController.getStats);

//get recipes
router.get("/recipes", adminController.getAllRecipes);

//get Users
router.get("/user/:id", adminController.getUserData);

export default router;
