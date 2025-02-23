import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    quentity:{
        type:Number,
        require:true
    },
    prdoctinfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    address:{
        type:String,
        require:true
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
})

export const Cart=mongoose.model("Cart",cartSchema)