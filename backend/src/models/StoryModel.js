import mongoose from "mongoose";

const storySchema=new mongoose.Schema({
    photo:{
        type:String,
        require:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    view:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{
    timestamps:true
})

export const Story=mongoose.model("Story",storySchema)