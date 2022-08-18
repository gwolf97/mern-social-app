import express from "express"
const router = express.Router()
import { getPosts, createPost, updatePost, deletePost } from "../controllers/posts.js"
import {auth} from '../middleware/auth.js'



router.route("/").get(getPosts).post(auth, createPost)
router.route("/:id").patch(auth, updatePost).delete(auth, deletePost)

export default router