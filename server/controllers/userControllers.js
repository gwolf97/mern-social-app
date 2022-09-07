import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModal.js"

export const signin = asyncHandler(async(req,res) =>{
    const {email, password} = req.body
    
    try {
        const existingUser = await User.findOne({email})

        if(!existingUser) return res.status(404).json({message:"User doesn't exist."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"})

        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, "secret", {expiresIn: "1h"})

        res.status(200).json({result:existingUser, token})

    } catch (error) {
        
    }

    })

export const signup = asyncHandler(async(req,res) =>{
    const {email, password, confirmPassword, userName}  = req.body   

    try {
        const existingEmail = await User.findOne({email})
        const existingUserName = await User.findOne({name:`${userName}`})

        if(existingEmail || existingUserName) return res.status(400).json({message:"User already exists."})

        if(password !== confirmPassword) return res.status(400).json({message:"Passwords don't match."})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({email, password:hashedPassword, name:`${userName}`})

        const token = jwt.sign({email:result.email, id:result._id}, "secret", {expiresIn: "1h"})

        res.status(200).json({result, token})
    } catch (error) {
        console.log(error)
    }
    
    })

export const getUsers = asyncHandler(async(req,res) =>{
        const keyword = req.query.keyword? {
            name: {
                $regex: req.query.keyword,
                $options: "i"
            }
        } : {}

        const users = await User.find({...keyword})
        
        res.json(users)
        })

export const getUser = asyncHandler(async(req,res) =>{
        const {id} = req.params
        const user = await User.findOne({_id: id})
        
        if(!mongoose.Types.ObjectId(id)){
            return res.status(404).send("No user with that id")
        }else{
            res.json({name: user.name, file: user.file, _id: user._id})
        } 
        })

export const updateUserFile = asyncHandler(async(req,res) =>{
        const id = req.userId
        const user = await User.findOne({id: id})
        const {file} = req.body
        
        if(!mongoose.Types.ObjectId(id)){
            return res.status(404).send("No user with that id")
        }else{
            const updatedUser = await User.findByIdAndUpdate(id, {...user, file: file}, {new: true})
        
            res.json(updatedUser)
        } 
        })