import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Message } from "../models/MessageModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/UserModel.js";
import { fileuploder } from "../utils/cloudinary.js";
import { getReceiverSocketId } from '../utils/Scokets.js'
import { io } from '../app.js'

const getUserForSlidebar=asyncHandler(async(req,res)=>{
    const userid=req.user._id;
    if(!userid){ throw new ApiError(403,"Unauthorized User") }
    const user=await User.findById(userid).select("-password")
    const followers=user.followers
    res.status(200).json(
        new ApiResponse(200,followers,"Followers Data Fetched Suceessfully")
    )
})

const getMessage = asyncHandler(async(req,res)=>{
    const { recieverid } = req.params;
    const userid=req.user._id;
    if(!userid){ throw new ApiError(403,"Unauthorized User") }
    const messages= await Message.find({
        $or:[
            {sender:userid,receiver:recieverid},
            {sender:recieverid,receiver:userid}
        ]
    })

    res.status(200).json(
        new ApiResponse(200,messages,"Messages Fetched Successfully")
    )
})

const sendMessage = asyncHandler(async (req, res) => {
    const { text, sender, receiver } = req.body;
    console.log(req.body);

    if (!sender || !receiver) {
        throw new ApiError(400, "Sender and Receiver are required");
    }

    const message = new Message({
        sender,
        receiver,
        text
    });

    await message.save();

    const receiverSocketid = getReceiverSocketId(receiver);
    if (receiverSocketid) {
        io.to(receiverSocketid).emit("message", message);
    }

    res.status(200).json(
        new ApiResponse(200, message, "Message Sent Successfully")
    );
});

const deleteMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    const userid = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
        throw new ApiError(404, "Message not found");
    }

    if (message.sender.toString() !== userid.toString() && message.receiver.toString() !== userid.toString()) {
        throw new ApiError(403, "Unauthorized action");
    }

    await message.deleteOne();

    res.status(200).json(new ApiResponse(200, {}, "Message deleted successfully"));
});

export { getUserForSlidebar,
    getMessage,
    sendMessage,
    deleteMessage,
}