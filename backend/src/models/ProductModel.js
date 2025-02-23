import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    quentity:{
        type:Number,
        default:0,
        require:true
    },
    price:{
        type:Number,
        default:0,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

export const Product=mongoose.model("Product",productSchema)