import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/PostModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fileuploder } from "../utils/cloudinary.js";
import { Comment } from "../models/CommentModel.js";
import mongoose from "mongoose";

const createPost=asyncHandler(async(req,res)=>{
    const { description } = req.body;
    console.log(req.file)
    const imagepath=req.file.path;
    if(!imagepath){ throw new ApiError(401,"Image Is Require To Post") }
    const image=await fileuploder(imagepath)

    const post=await Post.create({
        owner:req.user._id,
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
    console.log(req.user._id)
    console.log(post.owner)
    if(post.owner.toString() !== req.user._id.toString()){
        throw new ApiError(402,"only owner can delete this post")
    }

    await post.deleteOne()
    res.status(200).json(
        new ApiResponse(200,{},"Post Deleted Successfully")
    )
})

const addcomment=asyncHandler(async(req,res)=>{
    const { postid } = req.params;
    const { comment } = req.body;
    const userID=req.user._id;
    if(!postid){ throw new ApiError(401,"Post Id Is Required"); }
    if(!comment){ throw new ApiError(401,"Comment Is Required"); }   
    const post = await Post.findById(postid);
    if (!post) { throw new ApiError(404, "Post Not Found"); }
    const newcomment = await Comment.create({
        commentby: userID,
        comment
    })
    post.comments.push(newcomment._id);
    await post.save();
    res.status(200).json(
        new ApiResponse(200, post, "Comment Added Successfully")
    );
});

const deletecomment=asyncHandler(async(req,res)=>{
    const { postid , commentid } = req.params
    console.log(req.params)
    if(!postid){ throw new ApiError(402,"Post ID Is Required") }
    if(!commentid){ throw new ApiError(402,"Comment Id Is Required") }
    const post= await Post.findById(postid)
    if(!post){ throw new ApiError(404,"Post Not Found") }
    const commentindex=post.comments.find((c)=>{
        c._id.toString()===commentid.toString()
    })
    if(commentindex === -1){ throw new ApiError(404,"Comment Not Found") }
    post.comments.splice(commentindex,1)
    await post.save()

    res.status(200).json(
        new ApiResponse(200,post,"Comment Deleted Successfully")
    )
})

const updateComment=asyncHandler(async(req,res)=>{
    const { postid , commentid } = req.params;
    const { comment } = req.body;
    if(!postid){ throw new ApiError(401,"Post Id Is Required") }
    if(!commentid){ throw new ApiError(401,"Comment Id Is Required") }  
    if(!comment){ throw new ApiError(401,"Comment Is Required") }
    const post= await Post.findById(postid)
    if(!post){ throw new ApiError(404,"Post Not Found") }
    const commentindex=post.comments.findIndex((c)=>{
        console.log(c._id.toString())
        return c._id.toString() === commentid.toString()
    })
    if(commentindex === -1){ throw new ApiError(404,"Comment Not Found") }
    post.comments[commentindex].comment=comment
    await post.save()
    res.status(200).json(
        new ApiResponse(200,post,"Comment Updated Successfully")
    )
})

const likePost=asyncHandler(async(req,res)=>{
    const { postid } = req.params;
    if(!postid){ throw new ApiError(401,"Post Id Is Required") }
    const post=await Post.findById(postid)
    if(!post){ throw new ApiError(404,"Post Not Found") }
    const isLiked=post.likes.find((like)=>like.toString()===req.user._id.toString())
    if(isLiked){
        post.likes.pull(req.user._id)   
    }
    else{
        post.likes.push(req.user._id)
    }
    await post.save()
    res.status(200).json(
        new ApiResponse(200,post,"Post Liked Successfully")
    )   
})



export {
    createPost,
    getAllPost,
    getSinglePost,
    deletepost,
    addcomment,
    deletecomment,
    updateComment,
    likePost,
}