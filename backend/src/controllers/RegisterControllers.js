import { User } from '../models/UserModel.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import { fileuploder } from '../utils/cloudinary.js';
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'
import { upload } from '../middelwares/multer.js';

const genrateAccessAndRefreshToken=async(userid)=>{
    const user=await User.findOne(userid)
    const accessToken=await     user.genrateAccessToken()
    const refreshToken=await user.genrateRefreshToken()
    user.refreshToken=refreshToken;
    await user.save({validateBeforeSave:false})
    return { accessToken, refreshToken }
}

const register=asyncHandler(async(req,res)=>{
    const { username, email, password, bio, isBussiness, fullname } = req.body;
    console.log(req.body)
    if(username === "") throw new ApiError(401,"Username Can't Be Happy")
    if(email === "") throw new ApiError(401,"Email Can't Be Happy")
    if(password === "") throw new ApiError(401,"Password Can't Be Empty")
    if(fullname === "") throw new ApiError(401,"Fullname Can't Be Empty")
    const usercheck=await User.findOne({
        $or:[ { email } , { username } ]
    })
    if(usercheck){
        throw new ApiError(402,"User Already Exists")   
    }
    let profilePhoto;
    if(req.files){
        const profilePhotoPath=req.files?.profilePhoto[0]?.path;
        if(!profilePhotoPath) throw new ApiError(401,"Profile Photo Is Required")
            console.log(profilePhotoPath)
        profilePhoto=await fileuploder(profilePhotoPath)
        console.log(profilePhoto)
        if(!profilePhoto) throw new ApiError(401,"Profile Photo Is Required")
    }
    
    const user=await User.create({
        username,
        fullname,
        email,
        password,
        bio: bio || "",
        profilePhoto: "",
        isBussiness
    })
    const {refreshToken, accessToken}=await genrateAccessAndRefreshToken(user._id)
    console.log(accessToken)
    const loginuser=await User.findById(user._id).select("-password -refreshToken")

    const option={
        httpOnly:true,
        secure:false,
    }

    const createdUser=await User.findById(user._id).select("-password -refreshToken")

    return res.status(200)
            .cookie("AccessToken",accessToken,option)
              .cookie("RefreshToken",refreshToken,option)
                .json(new ApiResponse(200,createdUser,"User Registred Successfully"))
})

const login=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const { username, password } = req.body;
    console.log(req.body)
    if(!username) throw new ApiError(404,"UserName Is Empty")
    if(!password) throw new ApiError(404,"Password Is Empty")
    const usercheck=await User.findOne({username})
    console.log(usercheck)
    if(!usercheck) throw new ApiError(402,"Username Or Password Is Incorrect")
    
    const passcheck=await usercheck.isPasswordCorrect(password)
    console.log(passcheck)

    if(passcheck === false){ throw new ApiError(402,"Password Is Incorrect") }
    console.log(usercheck._id)
    
    const {refreshToken, accessToken}=await genrateAccessAndRefreshToken(usercheck._id)
    console.log(accessToken)
    const loginuser=await User.findById(usercheck._id).select("-password -refreshToken")

    const option={
        httpOnly:true,
        secure:false,
        sameSite:'Lax'
    }
    return res.status(200)
              .cookie("AccessToken",accessToken,option)
              .cookie("RefreshToken",refreshToken,option)
              .json(new ApiResponse(200,{
                user:loginuser,refreshToken,accessToken}
                ,"User LoggedIn SuccessFully"))       
})
const loginWithFormData = [upload.none(), login];

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

const updateUserDetails = asyncHandler(async (req, res) => {
    const { bio, fullname, username } = req.body;

    if (!bio && !fullname && !username) {
        throw new ApiError(400, "At least one field (bio, fullname, or username) is required to update");
    }

    const updateFields = {};
    if (bio) updateFields.bio = bio;
    if (fullname) updateFields.fullname = fullname;
    if (username) {
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
            throw new ApiError(400, "Username is already taken");
        }
        updateFields.username = username;
    }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateFields },
        { new: true } 
    ).select("-password -refreshToken");

    res.status(200).json(new ApiResponse(200, updatedUser, "User details updated successfully"));
});

const changeProfilePhoto=asyncHandler(async(req,res)=>{
    const profilePhotopath=req.file.path;
    console.log(profilePhotopath)
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

const getProfile=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const user=await User.findById(userId).select("-password -refreshToken");
    if(!user){ throw new ApiError(401,"User Not Found") }
    res.status(200)
        .json(new ApiResponse(200,user,"Profile Fetched Successfully"))
})

const FollowUser=asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    if(!userid){ throw new ApiError(401,"User Not Found") }
    const user=await User.findById(userid)
    if(!user){ throw new ApiError(401,"User Not Found") }
    const currentUser=await User.findById(req.user._id)

    if(currentUser.following.includes(userid)){
        throw new ApiError(401,"Already Following")
    }

    currentUser.following.push(userid)
    await currentUser.save()

    user.followers.push(req.user._id)
    user.save()
    res.status(200)
        .json(new ApiResponse(200,{},"Followed Successfully"))
})

const unfollowUser=asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    if(!userid){ throw new ApiError(401,"User Not Found") }
    const user=await User.findById(userid)
    if(!user){ throw new ApiError(401,"User Not Found") }
    const currentUser=await User.findById(req.user._id)
    if(!currentUser.following.includes(userid)){
        throw new ApiError(401,"Already UnFollowing")
    }
    currentUser.following.pull(userid)
    currentUser.save()
    user.followers.pull(req.user._id)
    user.save()
    res.status(200)
        .json(new ApiResponse(200,{},"UnFollowed Successfully"))
})

const getUserByID=asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    if(!userid){ throw new ApiError(401,"User Not Found") }
    const user=await User.findById(userid).select("-password -refreshToken") 
    if(!user){ throw new ApiError(401,"User Not Found") }
    res.status(200).json(new ApiResponse(200,user,"User Fetched Successfully"))
})

const ToggleFollow= asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    if(!userid){ throw new ApiError(401,"User Not Found") }
    const user = await User.findById(userid)
    if(!user){ throw new ApiError(401,"User Not Found") }
    const currentUser=await User.findById(req.user._id)
    if(currentUser.following.includes(userid)){
        currentUser.following.pull(userid)
        user.followers.pull(req.user._id)
    }
    else{
        currentUser.following.push(userid)
        user.followers.push(req.user._id)
    }
    await currentUser.save()
    await user.save()
    res.status(200)
        .json(new ApiResponse(200,{},"Toggle Follow Successfully"))
})

const getalluser= asyncHandler(async(req,res)=>{
    const user=await User.find().select("_id")
    res.status(200).json(
        new ApiResponse(200,user,"All User Fetched SuccessFully")
    )
})

export {
    register,
    login,
    logout,
    refreshTokenGenrate,
    changePassword,
    updateUserDetails,
    changeProfilePhoto,
    getProfile,
    FollowUser,
    unfollowUser,
    getUserByID,
    ToggleFollow,
    getalluser
}