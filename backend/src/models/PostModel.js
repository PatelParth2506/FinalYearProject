import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
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
            commentby:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            comment:{
                type:String,
                required:true
            }
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