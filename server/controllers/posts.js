import express from "express"
import mongoose from "mongoose"
import asyncHandler from "express-async-handler"
import PostMessage from "../models/postModal.js"

const getPosts = asyncHandler(async(req,res) =>{
   try {
    const posts = await PostMessage.find()

    res.status(200).json(posts)
   } catch (error) {
    res.status(404).json({message: error.message})
   }
})

const createPost = asyncHandler(async(req,res) =>{
    const {message, creator, tags, file} = req.body;

    console.log(req.body)

    const newPost = new PostMessage({
        message,
        creator,
        tags,
        file
    })

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }

})

export {
    getPosts,
    createPost
}