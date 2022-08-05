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
    const {message, selectedFile, creator, tags} = req.body;

    const newPost = new PostMessage({
        message,
        selectedFile,
        creator,
        tags,
    })

    await newPost.save()

    res.status(201).json(newPost)
})

export {
    getPosts,
    createPost
}