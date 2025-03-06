import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/PostModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fileuploder } from "../utils/cloudinary.js";

const createPost=asyncHandler(async(req,res)=>{
    const { description } = req.body;
    console.log(req.file)
    const imagepath=req.file.path;
    if(!imagepath){ throw new ApiError(401,"Image Is Require To Post") }
    const image=await fileuploder(imagepath)

    const post=await Post.create({
        user:req.user._id,
        description,
        photo:image.url
    })

    res.status(200).json(
        new ApiResponse(200,post,"Post Created SuccessFully")
    )
})

const getAllPost=asyncHandler(async(req,res)=>{
    const posts=await Post.find()
                          .populate("owner","username profilePhoto")
                          .sort({createdAt:-1})
    if(!posts){ throw new ApiError(404,"No Post Found") }
    res.status(200).json(
        new ApiResponse(200,posts,"All Post Fetched Successfully")
    )
})

const getSinglePost=asyncHandler(async(req,res)=>{
    const { postid } = req.params;
    if(!postid){ throw new ApiError(401,"Post Id Is Required")}
    const post=await Post.findById(postid)
                         .populate("owner","username profilePhoto")
                         .populate("comments.commentby","username profilePhoto")
    if(!post){ throw new ApiError(404,"No Post Found") }
    res.status(200).json(
        new ApiResponse(200,post,"Post Fetched SuccessFully")
    )
})

const deletepost=asyncHandler(async(req,res)=>{
    const{ post_id } = req.params;
    if(!post_id){ throw new ApiError(401,"Id Require To Delete") }
    const post=await Post.findById(post_id)
    if(!post){ throw new ApiError(404,"Post Not Found") }

    if(post.owner !== req.user._id){
        throw new ApiError(402,"only owner can delete this post")
    }

    await post.deleteOne()
    res.status(200).json(
        new ApiResponse(200,{},"Post Deleted Successfully")
    )
})

export {
    createPost,
    getAllPost,
    getSinglePost,
    deletepost,
}