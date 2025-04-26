import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { ApiError } from '../utils/ApiError.js'
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
    fullname:{
        type:String,
        require:true,
        trim:true,
        lowercase:true
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
        require:true
    },
    refreshToken:{
        type:String,
    },
    role: {
        type: String,
        enum: ["user", "creator", "admin"],
        default: "user"
      },      
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps:true
})

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        console.log("Password before hashing:", this.password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log("Password after hashing:", this.password);
        next();
    } catch (error) {
        console.log("Error in hashing password:", error);
        next(error)
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    if (!password) {
        throw new ApiError(401, "Password Is Missing");
    }

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", this.password);

    const match = await bcrypt.compare(password, this.password);
    console.log("Password Match:", match);

    return match;
};

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

// export const User=mongoose.model("User",userSchema)
export const User = mongoose.models.User || mongoose.model('User', userSchema);