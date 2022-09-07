import express from "express"
import path from "path"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { fileURLToPath } from "url"
import cors from "cors"
import postsRoutes from "./routes/postsRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url);

const _dirname = path.dirname(__filename)

connectDB()

const app = express()

app.use(bodyParser.json({limit:"30mb",}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postsRoutes)
app.use('/upload', uploadRoutes)
app.use('/user', userRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, "/uploads")))

app.use(express.static(path.join(_dirname, "../client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(_dirname, "../client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))