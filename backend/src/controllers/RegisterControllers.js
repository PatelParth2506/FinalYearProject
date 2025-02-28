import { User } from '../models/UserModel.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { fileuploder } from '../utils/cloudinary.js';
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'

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
              .json(new ApiResponse(200,{
                user:loginuser,refreshToken,accessToken}
                ,"User LoggedIn SuccessFully"))       
})

const logout=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {$set:{refreshToken:undefined}},
        {new:true}
    )
    const option={
        httpOnly:true,
        secure:true
    }
    res.status(200)
       .cookie("accessToken",option)
       .cookie("refreshToken",option)
       .json(new ApiResponse(200,{},"LogOut SuccessFullly"))  
})

const refreshTokenGenrate=asyncHandler(async(req,res)=>{
    const incomingToken=req.cookie.refreshToken;

    if(!incomingToken){
        throw new ApiError(401,"Refresh Token Expired")
    }

    const decodedToken=jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET)
    const user=await User.findById(decodedToken._id)

    if(incomingToken !== user.refreshToken){
        throw new ApiError(401,"Invalid Refresh Token")
    }

    const { refreshToken, accessToken }=genrateAccessAndRefreshToken(user._id)
    const option={
        httpOnly:true,
        secure:true
    }

    res.status(200)
       .cookie("accessToken",accessToken,option)
       .cookie("refreshToken",refreshToken,option)
       .json(new ApiResponse(200,
        {
            newrefreshToken:refreshToken,accessToken
        },"RefreshToken Genrated Successfully"
       ))
})

const changePassword=asyncHandler(async(req,res)=>{
    const { oldpassword, newpassword } = req.body;
    if(oldpassword === ""){ throw new ApiError(402,"Old PassWord Is Required") }
    if(newpassword === ""){ throw new ApiError(402,"New Password Is Required") }
    
    const user=await User.findById(req.user._id)

    const checkpassword=user.isPasswordCorrect(oldpassword)
    if(!checkpassword){
        throw new ApiError(402,"Invalid Password")
    }

    user.password=newpassword;
    await user.save({validateBeforeSave:false})

    res.status(200)
        .json(200,{},"Password Changed Successfully")
})

const  changeAccountDetails=asyncHandler(async(req,res)=>{
    const { email, bio }=req.body
    if(!email || !bio){
        throw new ApiError(402,"Email And Bio Is Required To Change")
    }

    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                email,
                bio
            }
        },
        {new:true}
    ).select("-password -refreshToken")

    res.status(200)
        .json(new ApiResponse(
            200,user,"Data Changed SuccessFully"
        ))
})

const changeProfilePhoto=asyncHandler(async(req,res)=>{
    const profilePhotopath=req.file.path;
    if(!profilePhotopath){
        throw new ApiError(403,"Profile Photo Is Required")
    }
    const profilePhoto=await fileuploder(profilePhotopath)
    if(!profilePhoto.url){
        throw new ApiError(501,"Can't Upload On Cloudinary")
    }
    const user=await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                profilePhoto:profilePhoto.url
            }
        },
        { new: true }
    ).select("-password -refreshToken")

    res.status(200)
        .json(new ApiResponse(200,user,"Profile Photo Changed Successfully"))
})

export {
    register,
    login,
    logout,
    refreshTokenGenrate,
    changePassword,
    changeAccountDetails,
    changeProfilePhoto,
}