import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    text : {
        type : String,
        trim : true,
        maxlength : 600
    },
    image : {
        type : String
    }
},{timestamps : true});

const Message = mongoose.model("Message",messageSchema);

export default Message;