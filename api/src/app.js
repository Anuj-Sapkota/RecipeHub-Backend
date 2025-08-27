import express from "express";
import connectDB from "./config/database.js";
import config from "./config/config.js";
import logger from "./middlewares/logger.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoute from "./routers/authRoute.js";
import recipeRoute from "./routers/recipeRoute.js";
import categoryRoute from './routers/categoryRoute.js'
import auth from "./middlewares/auth.js";
import favoriteRoute from "./routers/favoriteRoute.js";
const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger);

// Auth
app.use("/api/auth", authRoute);

// Recipe
app.use("/api/recipe", auth, recipeRoute);

//Category
app.use("/api/category", auth, categoryRoute);

// Favorites
app.use("/api/favorites", auth, favoriteRoute);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}....`);
});
