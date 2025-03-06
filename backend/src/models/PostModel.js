import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    photo:{
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
},{
    timestamps:true
})

export const Post=mongoose.model("Post",postSchema)