import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId,io } from "../config/socket.js";

export const getAllContacts = async(req,res) => {
    try {
        const loggedInUserId = req.user._id
        const contacts = await User.find({_id : {$ne : loggedInUserId}}).select("-password")
        return res.status(200).json(contacts)
    } catch (error) {
        console.log("Error in message controller!",error.message);
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const getMessagebyOtherUserId = async(req,res) => {
    try {
        const loggedInUserId = req.user._id
        const otheruserId = req.params.id
        
        const otheruser = await User.findById(otheruserId)
        if(!otheruser){
            return res.status(404).json({message : "user does not exist"})
        }

        const messages = await Message.find({
            $or : [
                {senderId : loggedInUserId , receiverId : otheruserId},
                {senderId : otheruserId , receiverId : loggedInUserId}
            ]
        })
        return res.status(200).json(messages)
        
    } catch (error) {
        console.log("Error in message controller!",error.message);
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export const sendMessage = async(req,res) => {
    try {
        const loggedInUserId  = req.user._id
        const otheruserId = req.params.id
        
        const otheruser = await User.findById(otheruserId)
        if(!otheruser){
            return res.status(404).json({message : "user does not exist"})
        }

        const {text,image} = req.body

        if(!text && !image){
            return res.status(400).json({message : "Message content is empty"})
        }

        let imageURL;
        if(image){
            const uploadimg = await cloudinary.uploader.upload(image)
            imageURL = uploadimg.secure_url
        }
        const newmessage = new Message({
            senderId : loggedInUserId,
            receiverId : otheruserId,
            text,
            image : imageURL
        })

        const response = await newmessage.save()

        const receiverSocketId = getReceiverSocketId(otheruserId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newmessage)
        }

        return res.status(201).json(response)
    } catch (error) {
        console.log("Error in message controller!",error.message);
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const getChatPartners = async(req,res) => {
    try {
        const loggedInUserId = req.user._id

        //find messages where loggedin user is either sender or receiver
        const messages = await Message.find({
            $or : [
                {senderId : loggedInUserId},
                {receiverId : loggedInUserId}
            ]
        })
        
        const chatPartnerIds = [
            ...new Set(messages.map((msg) => {
            return msg.senderId.toString() ===  loggedInUserId.toString()
             ? msg.receiverId.toString()
             : msg.senderId.toString()
        }))]

        const chatPartners = await User.find({_id : {$in : chatPartnerIds}}).select("-password")
        
        return res.status(200).json(chatPartners)
        
    } catch (error) {
        console.log("Error in message controller!",error.message);
        return res.status(500).json({message : "Internal Server Error"})
    }
}