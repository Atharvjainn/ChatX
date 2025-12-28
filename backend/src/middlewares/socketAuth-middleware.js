import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { jwt_secret } from '../config/serverConfig.js'
import User from '../models/User.js'


export const socketAuthMiddleware = async(socket,next) => {
    try {
        const cookies = cookie.parse(socket.handshake.headers.cookie)
        const token = cookies.jwt

        if(!token){
            console.log("error no token provided");
            return next(new Error("Unauthorised - No token provided"));
        }

        const decoded = jwt.verify(token,jwt_secret)
        if(!decoded){
            console.log("Token not verified");
            return next(new Error("Unauthorised - No token verified"));
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            console.log("Socket connection rejected: User not found");
            return next(new Error("User not found"));
        }

        socket.user = user;
        socket.userId = user._id.toString()

        console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);
        next()


    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        next(new Error("Unauthorized - Authentication failed"));
    }
}