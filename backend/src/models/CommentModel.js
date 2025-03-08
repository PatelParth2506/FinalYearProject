import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    commentby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export const Comment=mongoose.model("Comment",commentSchema)