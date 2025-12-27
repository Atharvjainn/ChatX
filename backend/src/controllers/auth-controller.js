import User from '../models/User.js'
import { sendWelcomemail } from '../utils/EmailHandler.js'
import { hashpassword,generateToken } from '../utils/helperfns.js'
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudinary.js'
import { CLIENT_URL } from '../config/serverConfig.js'

export const signup = async(req,res) => {
    const {fullName,email,password} = req.body
    try {
        const user = await User.findOne({
            email : email
        })

        if(user){
            return res.status(400).json({
                message : "Email already exists!"
            })
        }

        const hashedpassword = await hashpassword(password);
        const newUser = await User.create({
            fullName,email,password : hashedpassword
        })

        // sendWelcomemail(email,fullName,CLIENT_URL)

        if(newUser){
            generateToken(newUser._id,res)
            return res.status(201).json({
                data : newUser,
                message : "User created successfully!",
                success : true,
            })
        }
        else{
            return res.status(400).json({
                message : "invalid user data"
            })
        }


    } catch (error) {
        console.log("Error in signup controller!",error.message);
        return res.status(500).json({
            message : "Internal server error"
        })
    }



}

export const login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email : email})

        if(!user){
            return res.status(400).json({
                message : "User does not exist!"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message : "Invalid credentials!"
            })
        }
        generateToken(user._id,res)

         return res.status(200).json({
                data : user,
                message : "User logged in successfully!",
                success : true,
            })

    } catch (error) {
        console.log("Error in login controller!",error.message);
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}


export const logout = async (req,res) => {
    try {
        res.cookie("jwt","",{maxAge : 0})
        return res.status(200).json({
            message : "User logged out successfully!"
        })
    } catch (error) {
        console.log("Error in logout controller!",error.message);
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}


export const Updateprofile = async(req,res) => {
    try {
        const { profilePic } = req.body
        if(!profilePic) {
            return res.status(400).json({message : "Profile photo is required"})
        }
        const userId = req.user._id

        const uploadresponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic : uploadresponse.secure_url},
            {new : true}
        ).select("-password")

        return res.status(200).json({
            data : updatedUser,
            message : "Profile updated successfully!"
        })
    } catch (error) {
        console.log("error in updateprofile controller");
        return res.status(500).json({message : "Internal Server Error"})
    }
}