import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true,
    },
    profilePhoto:{
        type:String,
        require:true,
    },
    bio:{
        type:String,
    },
    isBussiness:{
        type:Boolean,
        default:false,
        require:true
    },
    refreshToken:{
        type:String,
    }
},{
    timestamps:true
})

export const User=mongoose.model("User",userSchema)