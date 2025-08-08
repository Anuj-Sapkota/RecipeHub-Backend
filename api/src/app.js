// src/app.js

import express from "express";
import connectDB from "./config/database.js";
import config from "./config/config.js";

// ✅ Import only the functions you need
import {
  addFavorite,
  removeFavorite,
  getAllFavorites,
  isFavorited,
} from "./controllers/favoriteController.js";

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Favorite routes
app.post("/api/favorites/:recipeId", addFavorite);
app.delete("/api/favorites/:recipeId", removeFavorite);
app.get("/api/favorites", getAllFavorites);
app.get("/api/favorites/:recipeId", isFavorited); // Optional: check if favorited

// ✅ Start server
app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}....`);
});
