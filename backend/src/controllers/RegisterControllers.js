import { User } from '../models/UserModel.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { fileuploder } from '../utils/cloudinary.js';
import { ApiResponse } from "../utils/ApiResponse.js"

const genrateAccessAndRefreshToken=async(userid)=>{
    const user=await User.findOne(userid)
    const accessToken=user.genrateAccessToken()
    const refreshToken=user.genrateRefreshToken()
    user.refreshToken=refreshToken;
    await user.save({validateBeforeSave:false})
    console.log("accessToken===",accessToken)
    console.log("RefreshToken===",refreshToken)
    return { accessToken, refreshToken }
}

const register=asyncHandler(async(req,res)=>{
    const { username, email, password, bio } = req.body;
    
    if(username === "") throw new ApiError(401,"Username Can't Be Happy")
    if(email === "") throw new ApiError(401,"Email Can't Be Happy")
    if(password === "") throw new ApiError(401,"Password Can't Be Empty")

    const usercheck=await User.findOne({
        $or:[ { email } , { username } ]
    })

    if(!usercheck){
        throw new ApiError(402,"User Already Exists")   
    }

    const profilePhotoPath=req.file.profilePhoto[0].path;
    if(!profilePhotoPath) throw new ApiError(401,"Profile Photo Is Required")
    
    const profilePhoto=await fileuploder(profilePhotoPath)
    if(!profilePhoto) throw new ApiError(501,"Profile Photo Is Required")
    
    const user=await User.create({
        username,
        email,
        password,
        bio: bio || "",
        profilePhoto:profilePhoto.url
    })

    const createdUser=await User.findOne(user._id).select("-password -refreshToken")

    return res.status(200).json(new ApiResponse(200,createdUser,"User Registred Successfully"))
})

const login=asyncHandler(async(req,res)=>{
    const { username, password } = req.body;
    if(username === "") throw new ApiError("UserName Is Empty")
    if(password === "") throw new ApiError("Password Is Empty")

    const usercheck=await User.findOne({
        $or:[{username}]
    })

    if(!usercheck) throw new ApiError("Username Or Password Is Incorrect")
    
    const passcheck=await usercheck.isPasswordCorrect(password)

    if(!passcheck){ throw new ApiError("Password Is Incorrect") }

    const {refreshToken, accessToken}=await genrateAccessAndRefreshToken(usercheck._id)

    const loginuser=await User.findOne(usercheck._id).select("-password -refreshToken")

    const option={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
              .cookie("AccessToken",accessToken,option)
              .cookie("RefreshToken",refreshToken,option)
              .json(new ApiResponse(200,loginuser,"User LoggedIn SuccessFully"))       
})

export {
    register,
    login,
}