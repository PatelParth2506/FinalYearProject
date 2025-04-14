import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    quentity:{
        type:Number,
        require:true
    },
    productinfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
})

export const Cart=mongoose.model("Cart",cartSchema)