import TravelStory from "../models/travelStory.model.js"
import { errorHandlar } from "../utils/error.js"

export const addTravelStory = async (req, res, next) => {
const {title, story, visitedLoaction, imageUrl, visitedDate} = req.body



// validate required field
if (!title || !story || !visitedLoaction || !imageUrl || !visitedDate){
    return next(errorHandlar(400, "All fields are required"))

}

const userId = req.user.id

// convert visited date from milliseconds to Date Object
const parsedVisitedDate = new Date(parseInt(visitedDate))

try {
    const travelStory = new TravelStory({
        title,
        story,
        visitedLoaction,
        userId,
        imageUrl,
        visitedDate: parsedVisitedDate,     
    })
    await travelStory.save()

res.status(201).json({
    story: travelStory,
    message: "your Story is added successfully!",
}) 
} catch (error) {
    next(error)
}
}


export const getAllTravelStory = async(req, res, next) => {
    const userId = req.user.id

    try {
        const travelStories = await TravelStory.find({userId: userId}).sort({
            isFavorite: -1, 
        })

        res.status(200).json({ stories: travelStories })
    } catch (error) {
        next(error)
        
    }
}