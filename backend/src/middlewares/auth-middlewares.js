import { jwt_secret } from "../config/serverConfig.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup_middlewares = (req,res,next) => {
    const { fullName,email,password } = req.body

    if(!fullName || !email || !password) {
        return res.status(400).json({message:"All fields are required"});
    }

    if(password.length < 6) {
        return res.status(400).json({message:"Password must be at least 6 characters long"});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({message:"Invalid email format"});
    }

    next();
}



export const login_middlewares = (req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message:"All fields are required"});
    }

    next()
}



export const verifyToken = async(req,res,next) => {
    try {
        const token = req.cookies.jwt;
        
        if(!token){
                return res.status(401).json({message:"Unauthorized! No token provided"});
            }
        const decoded = jwt.verify(token,jwt_secret);
            if(!decoded){
                return res.status(401).json({message:"Unauthorized! Invalid token"});
            }
        const user = await User.findById(decoded.userId).select("-password");
            if(!user){
                return res.status(401).json({message:"Unauthorized! User not found"});
            }
        req.user = user;
        next();
    } catch (error) {
        console.log("Middleware error");
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}