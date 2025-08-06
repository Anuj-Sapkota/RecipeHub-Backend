import express from "express";
import connectDB from "./config/database.js";
import config from "./config/config.js";
import {
  addFavorite,
  removeFavorite,
  getAllFavorites,
} from "./controllers/favoriteController.js";

const app = express();

connectDB();

// Sample Routes
app.post("/api/favorites/:recipeId", favoriteController.addFavorite);
app.delete("/api/favorites/:recipeId", favoriteController.removeFavorite);
app.get("/api/favorites", favoriteController.getAllFavorites);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}....`);
});
