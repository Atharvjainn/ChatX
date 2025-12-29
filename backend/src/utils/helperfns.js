import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwt_secret,NODE_ENV } from '../config/serverConfig.js';

export const hashpassword = async(password) => {
    const salt = 10;
    const hashpassword = await bcrypt.hash(password,salt)
    return hashpassword
}


export const generateToken = async(userId,res) => {
    const token = jwt.sign({
        userId
    },jwt_secret,{expiresIn : "7d"})

    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
        sameSite : "none",
        secure : true,
    })
    return token
}