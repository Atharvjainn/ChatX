import mongoose from "mongoose";
import { mongoURL} from "./serverConfig.js";


export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(mongoURL)
        console.log("Mongo DB connected : ",connect.connection.name);
    } catch (error) {
        console.log("Error connection to MongoDB");
        process.exit(1);
    }
}