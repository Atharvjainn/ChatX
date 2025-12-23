import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const mongoURL = process.env.MONGO_URL
const jwt_secret = process.env.JWT_SECRET
const NODE_ENV = process.env.NODE_ENV
export {
    PORT,mongoURL,jwt_secret,NODE_ENV
}