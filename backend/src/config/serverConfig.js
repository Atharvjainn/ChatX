import dotenv from "dotenv";

dotenv.config();


const mongoURL = process.env.MONGO_URL
const jwt_secret = process.env.JWT_SECRET
const NODE_ENV = process.env.NODE_ENV
const RESEND_API_KEY = process.env.RESEND_API_KEY
const EMAIL_FROM = process.env.EMAIL_FROM
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_CLOUD_API = process.env.CLOUDINARY_CLOUD_API
const CLOUDINARY_CLOUD_SECRET = process.env.CLOUDINARY_CLOUD_SECRET
const ARCJET_KEY = process.env.ARCJET_KEY
const ARCJET_ENV = process.env.ARCJET_ENV
const CLIENT_URL = process.env.CLIENT_URL

export {
    mongoURL,jwt_secret,NODE_ENV,RESEND_API_KEY,EMAIL_FROM,EMAIL_FROM_NAME,CLOUDINARY_CLOUD_NAME,CLOUDINARY_CLOUD_API,CLOUDINARY_CLOUD_SECRET,ARCJET_KEY,ARCJET_ENV,CLIENT_URL
}