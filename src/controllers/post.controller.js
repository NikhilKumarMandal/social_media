import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { user } from "../models/user.model.js"
import { SocialPost } from "../models/post.model.js";

const createPost = asyncHandler(async(req,res) => {
    const { content,tags } = req.body

    if(!content){
        throw new ApiError(400,"Content field is required")
    }

    let imagesLocalPath;
    if (req.files && Array.isArray(req.files.images) && req.files.images.length > 0) {
        imagesLocalPath = req.files.images[0].path
    }

    const post = await SocialPost.create({
        content,
        tags: tags || [],
        author: req.user?._id,
        images: images?.url
    })

    if (!post) {
        throw new ApiError(500,"Something went wrong")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            post,
            "POST created successfully"
            )
        )
})

const deletePost = asyncHandler(async(req,res) => {
    const {postId} = req.params

    const deletePost = await SocialPost.findOneAndDelete({
        _id: postId,
        author: req.user?._id
    })

    if (!post) {
        throw new ApiError(404, "Post does not exist");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Deleted Successfully"
            )
        )
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