import dotenv from "dotenv";

dotenv.config();

const config = {
  mongoDBUrl: process.env.MONGODB_URL || "",
  port: process.env.PORT || "5000",
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET
};

export default config;
