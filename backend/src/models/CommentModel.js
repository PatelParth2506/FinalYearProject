import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    commentby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    commentfrom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    commentdata:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

export const Comment=mongoose.model("Comment",commentSchema)