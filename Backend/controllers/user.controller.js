import User from "../models/user.model.js"
import TravelStory from "../models/travelStory.model.js"
import { errorHandlar } from "../utils/error.js"


export const getUsers = async(req, res, next) => {
    const userId = req.user.id

    const validUser = await User.findOne({_id: userId})

    if(!validUser){
        return next(errorHandlar(401, "Unauthorized"))
    }

    const {password: pass, ...rest} = validUser._doc

    res.status(200).json(rest)
}

export const getAllPublicUsers = async(req, res, next) => {
    try {
        const users = await User.find({}).select("-password")

        // Get story count for each user
        const usersWithStoryCount = await Promise.all(
            users.map(async (user) => {
                const storyCount = await TravelStory.countDocuments({
                    userId: user._id,
                    isPublic: true,
                })
                return {
                    ...user._doc,
                    storyCount,
                }
            })
        )

        res.status(200).json({ users: usersWithStoryCount })
    } catch (error) {
        next(error)
    }
}

export const getUserProfile = async(req, res, next) => {
    const { userId } = req.params

    try {
        const user = await User.findById(userId).select("-password")

        if(!user){
            return next(errorHandlar(404, "User not found"))
        }

        // Get public stories of this user
        const stories = await TravelStory.find({
            userId: userId,
            isPublic: true,
        }).sort({ isFavorite: -1 })

        res.status(200).json({ user, stories })
    } catch (error) {
        next(error)
    }
}

export const updateUserProfile = async(req, res, next) => {
    const userId = req.user.id
    const { bio, country, profilePhoto } = req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                bio,
                country,
                profilePhoto,
            },
            { new: true }
        ).select("-password")

        if(!updatedUser){
            return next(errorHandlar(404, "User not found"))
        }

        res.status(200).json({ user: updatedUser, message: "Profile updated successfully!" })
    } catch (error) {
        next(error)
    }
}