import mongoose from "mongoose";

const followerSchema=new mongoose.Schema({
    followers:{
        type:Number,
        default:0,
    },
    following:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export const follower=mongoose.model("follower",followerSchema)