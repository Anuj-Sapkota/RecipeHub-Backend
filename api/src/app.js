import express from "express";
import connectDB from "./config/database.js";
import config from "./config/config.js";
import logger from "./middlewares/logger.js";
import bodyParser from "body-parser";
import router from "./routers/authRoute.js";
const app = express();

connectDB();

app.use(bodyParser.json());
app.use(logger);

// Auth
app.use("/api/auth", router);

app.listen(config.port, () => {
  console.log(`Server running at port: ${config.port}....`);
});
