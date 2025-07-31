import express from "express";
import connectDB from "./config/database.js";
import config from "./config/config.js";
const app = express();

connectDB();

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}....`);
});
