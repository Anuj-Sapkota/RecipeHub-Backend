import express from "express";
import connectDB from "./config/database.js";
import config from "./config/config.js";
import logger from "./middlewares/logger.js";
import bodyParser from "body-parser";
const app = express();

connectDB();

app.use(bodyParser.json());
app.use(logger);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}....`);
});
