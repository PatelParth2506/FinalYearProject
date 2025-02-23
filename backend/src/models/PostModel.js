import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    photo:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    like:{
        type:Number,
        default:0,
    }
},{
    timestamps:true
})

export const Post=mongoose.model("Post",postSchema)