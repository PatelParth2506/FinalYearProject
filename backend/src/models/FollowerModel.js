import mongoose from "mongoose";

const followerSchema=new mongoose.Schema({
    followers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

export const Follower=mongoose.model("Follower",followerSchema)