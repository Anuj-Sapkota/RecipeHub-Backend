import express from "express";
import commentController from "../controllers/commentController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Create a new comment for a recipe (protected)
router.post("/:recipeId/comments", auth, commentController.createComment);

// Get all comments for a specific recipe
router.get("/:recipeId/comments", commentController.getCommentsByRecipeId);

// Update a comment by ID (protected - only the owner can update)
router.put("/:commentId", auth, commentController.updateComment);

// Delete a comment by ID (protected - only the owner can delete)
router.delete("/:commentId", auth, commentController.deleteComment);

export default router;
