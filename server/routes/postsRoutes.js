import express from "express"
const router = express.Router()
import { getPosts, createPost, updatePost, deletePost, likePost, createComment, deleteComment } from "../controllers/posts.js"
import {auth} from '../middleware/auth.js'



router.route("/").get(getPosts).post(auth, createPost)
router.route("/:id").patch(auth, updatePost).delete(auth, deletePost)
router.route("/:id/like").patch(auth, likePost)
router.route("/:id/comments").post(auth, createComment)
router.route("/:id/:commentid/comments").delete(auth, deleteComment)

export default router