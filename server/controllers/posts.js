import express from "express"
import mongoose from "mongoose"
import asyncHandler from "express-async-handler"
import PostMessage from "../models/postModal.js"
import User from "../models/userModal.js"


const getPosts = asyncHandler(async(req,res) =>{

   try {
    const posts = await PostMessage.find().limit(3).sort({ createdAt: -1 }).skip(req.query.skip)

    res.status(200).json(posts)
   } catch (error) {
    res.status(404).json({message: error.message})
   }
})

const createPost = asyncHandler(async(req,res) =>{
    const post = req.body;

    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }

})

const updatePost = asyncHandler(async(req,res) =>{
const {id:_id} = req.params
const post = req.body

if(!mongoose.Types.ObjectId(_id)){
    return res.status(404).send("No post with that id")
}else{
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})

    res.json(updatedPost)
}

})

const deletePost = asyncHandler(async(req,res) =>{
const {id:_id} = req.params

if(!mongoose.Types.ObjectId(_id)){
    return res.status(404).send("No post with that id")
}else{
    const deletedPost = await PostMessage.findByIdAndDelete(_id)

    res.json("Delete successful")
}

})

const likePost = asyncHandler(async(req,res) =>{
    const {id:_id} = req.params

    if(!req.userId) return res.json({message: "Unauthenticated"})
    
    if(!mongoose.Types.ObjectId(_id)){
        return res.status(404).send("No post with that id")
    }else{
        const post = await PostMessage.findById(_id)

        const index = post.likes.findIndex((_id) => _id === String(req.userId))

        if(index === -1){
            post.likes.push(req.userId)
        }else{
            post.likes = post.likes.filter((_id) => _id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})
    
        res.json(updatedPost)
    }
})

const createComment = asyncHandler(async (req, res) => {
    const {comment: newComment} = req.body
    const {id:_id} = req.params

    const user = await User.findById(req.userId)

    const post = await PostMessage.findById(_id)

    if(post){
       const comment = {
        name: user.name,
        comment: newComment,
        user: req.userId
       }

       post.comments.push(comment)

       post.numComments = post.comments.length

       const postWithNewComment = await post.save()
       res.status(201).json(postWithNewComment)

    } else {
        res.status(404)
        throw new Error("Post not found")
    }
})

const deleteComment = asyncHandler(async (req, res) => {
    const {id:_id, commentid:commentId} = req.params

    const post = await PostMessage.findById(_id)

    const index = post.comments.findIndex((comment) => comment._id.toString() === commentId)

    const comment = post.comments.filter((comment) => comment._id.toString() === commentId)[0]

    if(post){
        if(index > -1 && comment.user.toString() === req.userId){
            post.comments.splice(index, 1)

            post.numComments = post.comments.length

            const postWithRemovedComment = await post.save()
            res.status(201).json(postWithRemovedComment)
        }else{
            res.status(404)
            throw new Error("comment not found")
        }
    } else {
        res.status(404)
        throw new Error("Post not found")
    }
})

export {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    createComment,
    deleteComment
}