import mongoose from "mongoose";
import { SocialComment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async(req,res) => {
    const {postId} = req.params
    const {content} = req.body

    const comment = await SocialComment.create({
        content,
        author:req.user?._id,
        postId
    })

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            comment,
            "Comment added successfully"
            )
        )

    
})

const getPostComments = asyncHandler(async(req,res) => {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;


})

const deleteComment = asyncHandler(async(req,res) => {
    const { commentId } = req.params;

    const deletedComment = await SocialComment.findOneAndDelete({
        _id:new mongoose.Types.ObjectId(commentId),
        author: req.user?._id
    });

    if (!deletedComment) {
        throw new ApiError(
        404,
        "Comment is already deleted or you are not authorized for this action."
        );
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {deletedComment},
            "Deletion Successful"
            )
    );


})

const updateComment = asyncHandler(async(req,res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    const updatedComment =await SocialComment.findOneAndUpdate(
        {
        id: new mongoose.Types.ObjectId(commentId),
        author: req.user?._id
        },
        {
            $set: {
                content
            }
        },
        {
            new: true
        }
    )

    if (!updatedComment) {
        throw new ApiError(
        404,
        "Comment does not exist or you are not authorized for this action."
          );
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedComment,
            "Comment updated successfully"
            )
        )

})


export { 
    addComment, 
    getPostComments, 
    deleteComment, 
    updateComment 
};