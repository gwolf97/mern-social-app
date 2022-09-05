import express from "express"
import auth from "../middleware/auth.js"
import { getUser, signin, signup, updateUserFile } from "../controllers/userControllers.js"

const router = express.Router()

router.route("/signin").post(signin)
router.route("/signup").post(signup)
router.route("/profilepic").patch(auth, updateUserFile)
router.route("/:id").get(getUser)

export default router