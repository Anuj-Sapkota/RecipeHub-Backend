import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        const status = await mongoose.connect(config.mongoDBUrl);
        console.log(`Database Connected at port ${status.connection.port}`)
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
};

export default connectDB;