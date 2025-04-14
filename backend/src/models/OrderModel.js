import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products:[{
        productid:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    totalprice:{
        type:Number,
        required:true
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
})

export const Order = mongoose.model("Order",orderSchema)

