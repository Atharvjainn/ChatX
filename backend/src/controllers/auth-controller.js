import User from '../models/User.js'
import { hashpassword,generateToken } from '../utils/helperfns.js'


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