import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import ApiError from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'

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

userSchema.pre("save",async function(next) {
    if(this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password) {
    if(!password === !this.password){
        return new ApiError(401,"Password Is Missing")
    }

    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAccessToken=async function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },process.env.ACCESS_TOKEN_SECRET,
    {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.genrateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,
    {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User=mongoose.model("User",userSchema)