import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const mongoURL = process.env.MONGO_URL
const jwt_secret = process.env.JWT_SECRET
const NODE_ENV = process.env.NODE_ENV
const RESEND_API_KEY = process.env.RESEND_API_KEY
const EMAIL_FROM = process.env.EMAIL_FROM
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME

export {
    PORT,mongoURL,jwt_secret,NODE_ENV,RESEND_API_KEY,EMAIL_FROM,EMAIL_FROM_NAME
}