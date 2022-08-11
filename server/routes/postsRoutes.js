import express from "express"
const router = express.Router()
import { getPosts, createPost, updatePost } from "../controllers/posts.js"



router.route("/").get(getPosts).post(createPost)
router.route("/:id").patch(updatePost)

export default router