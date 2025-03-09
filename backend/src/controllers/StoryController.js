import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/UserModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Story } from "../models/StoryModel.js";

const createStory=asyncHandler(async(req,res)=>{
    console.log(req.file.path)
    const photo = req.file.path;
    console.log(photo)
    if(!photo){ throw new ApiError(401,"Photo Is Required") }
    const story=await Story.create({
        photo,
        owner:req.user._id
    })
    res.status(200)
    .json(new ApiResponse(200,story,"Story Created Successfully"))  
})

const getFolloingStory=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
                        .populate("following","username profilePhoto")
                        .select("following")
    if(!user){ throw new ApiError(404,"User Not Found") } 
    const following=user.following 
    const followingStory= await Story.find({owner:{$in:following}})
    .populate("owner","username profilePhoto")
    .sort({createdAt:-1})   
    
    for (let story of followingStory) {
        if (story.owner._id.toString() !== req.user._id.toString()) {
            if (!story.view.includes(req.user._id)) {
                story.view.push(req.user._id); 
                await story.save();
            }
        }
    }
    
    res.status(200).json(
        new ApiResponse(200,followingStory,"Following Story Fetched Successfully")
    )
})

const deleteStory=asyncHandler(async(req,res)=>{
    const { storyid } = req.params;
    if(!storyid){ throw new ApiError(401,"Story Id Is Required") }
    const story=await Story.findById(storyid)
    if(!story){ throw new ApiError(404,"Story Not Found") }
    if(story.owner.toString() !== req.user._id.toString()){
        throw new ApiError(402,"Only Owner Can Delete This Story")
    }
    await story.deleteOne()
    res.status(200).json(
        new ApiResponse(200,story,"Story Deleted Successfully")
    )
})

const getViewersofStory=asyncHandler(async(req,res)=>{
    const { storyid } = req.params
    if(!storyid){ throw new ApiError(401,"Story Id Is Required") }
    const story=await Story.findById(storyid)
    .populate("view","username profilePhoto")
    if(!story){ throw new ApiError(404,"Story Not Found") }
    res.status(200).json(
        new ApiResponse(200,story.view,"Story Viewers Fetched Successfully")
    )
})

export {
    createStory,
    getFolloingStory,
    deleteStory,
    getViewersofStory
}