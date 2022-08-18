import express from "express"
import auth from "../middleware/auth.js"
import { signin, signup } from "../controllers/userControllers.js"

const router = express.Router()

router.route("/signin").post(signin)
router.route("/signup").post(signup)

export default router