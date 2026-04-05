import express from "express"
import { getUsers, getUserProfile, updateUserProfile, getAllPublicUsers } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/verifyUsers.js"

const router = express.Router()

router.get("/getusers", verifyToken, getUsers)
router.get("/all-users", verifyToken, getAllPublicUsers)
router.get("/profile/:userId", verifyToken, getUserProfile)
router.put("/update-profile", verifyToken, updateUserProfile)

export default router