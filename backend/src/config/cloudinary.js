import {v2 as cloudinary} from 'cloudinary'
import { CLOUDINARY_CLOUD_API, CLOUDINARY_CLOUD_NAME, CLOUDINARY_CLOUD_SECRET } from './serverConfig.js'

cloudinary.config({
    cloud_name : CLOUDINARY_CLOUD_NAME,
    api_key : CLOUDINARY_CLOUD_API,
    api_secret : CLOUDINARY_CLOUD_SECRET
})


export default cloudinary