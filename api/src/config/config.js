import dotenv from "dotenv";

dotenv.config();

const config = {
  mongoDBUrl: process.env.MONGODB_URL="mongodb+srv://sapkotaanuj10011:itjs79v438IZkQda@mern.l2fa2xl.mongodb.net/recipehub?retryWrites=true&w=majority&appName=Mern"
 || "",
  port: process.env.PORT || "5000",
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET
};

export default config;
