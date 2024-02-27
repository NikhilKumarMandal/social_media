import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { user } from "../models/user.model.js"
import { SocialPost } from "../models/post.model.js";

const createPost = asyncHandler(async(req,res) => {
    const {content,tags} = req.body

    if(!content){
        throw new ApiError(400,"Content field is required")
    }

    const post = await SocialPost.create({
        content,
        tags: tags || [],
        author,
        images
    })

    if (!post) {
        throw new ApiError(500,"Something went wrong")
    }
})

const deletePost = asyncHandler(async(req,res) => {

})

const getAllPosts = asyncHandler(async(req,res) => {

})

const getBookMarkedPosts = asyncHandler(async(req,res) => {

})

const getMyPosts = asyncHandler(async(req,res) => {

})

const getPostById = asyncHandler(async(req,res) => {

})

const getPostsByUsername = asyncHandler(async(req,res) => {

})

const removePostImage = asyncHandler(async(req,res) => {

})
 const updatePost = asyncHandler(async(req,res) => {

})

const getPostsByTag = asyncHandler(async(req,res) => {

})
export {
    createPost,
    deletePost,
    getAllPosts,
    getBookMarkedPosts,
    getMyPosts,
    getPostById,
    getPostsByUsername,
    removePostImage,
    updatePost,
    getPostsByTag,
  };