import { ApiError } from "../utils/ApiError.js"
import { SocialComment } from "../models/comment.model.js";
import { SocialLike } from "../models/like.model.js";
import { SocialPost } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const likeDislikePost = asyncHandler(async (req,res) => {
    const {postId} = req.params
    const post = await SocialPost.findById(postId)
    
    if (!post) {
        throw new ApiError(400,"Post does not exist")
    }

    const isAlreadyLike = await SocialLike.findOne({
        postId,
        likedBy: req.user?._id
    })

    if (isAlreadyLike) {
        SocialLike.findOneAndDelete({
        postId,
        likedBy: req.user?._id
        });
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
        {
            isliked:false
        },
        "Disliked successfully"
        )
    )
    }else{
        SocialLike.create({
            postId,
        likedBy: req.user?._id
        })

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
        {
            isliked: true
        },
        "Liked sucessfully"
        )
    )
    }
})

const likedDislikedComment = asyncHandler(async(req,res) => {
     const {commentId} = req.params
    
     const comment = await SocialComment.findById(commentId)

     if (!comment) {
        throw new ApiError(400,"Comment does not found")
     }

    const isAlreadyLike = await SocialComment.findOne(
        {
            commentId,
            likedBy: req.user?._id
        }
    )

    if (isAlreadyLike) {
        await SocialComment.findOneAndDelete({
            commentId,
            likedBy: req.user?._id
        })

        return res
        .status(200)
        .json(
            200,
        {
            isliked: false
        },
        'Unlike successfull'
        )
    }else {
        await SocialComment.create({
            commentId,
            likedBy: req.user?._id
        })

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
        {
            isliked: true
        },
        "Liked successfully"
        )
    )
    }
})


export {
    likeDislikePost,
    likedDislikedComment
}