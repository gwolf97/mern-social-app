import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import mongoose from "mongoose"
import cors from "cors"
import postsRoutes from "./routes/postsRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postsRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))