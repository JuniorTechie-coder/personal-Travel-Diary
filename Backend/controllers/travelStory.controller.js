
import { fileURLToPath } from "url"
import TravelStory from "../models/travelStory.model.js"
import { errorHandlar } from "../utils/error.js"
import path from "path"
import fs from "fs"

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

export const imageUpload = async(req, res, next) => {
    try {
      if(!req.file){
        return next(errorHandlar(400, "No image uploaded"))
      }  

      const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`
       
      res.status(201).json( { imageUrl })
    } catch (error) {
        next(error)
        
    }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootDir = path.join(__dirname, "..")

export const deleteImage = async(req, res, next) => {
    const { imageUrl } = req.query

    if(!imageUrl){
        return next (errorHandlar(400, "imageUrl parameter is required!"))
    }

    try {
       // extract the file name from the imageUrl
       const filename = path.basename(imageUrl) 

       //Delete file path
       const filepath =  path.join(rootDir,"uploads", filename)

       console.log(filepath)

      //check if the file exists
      if(!fs.existsSync(filepath)){
        return next(errorHandlar(404, "Image not found!"))
      }

      //delete the file
      await fs.promises.unlink(filepath)

      res.status(200).json({message: "Image-deleted successfully! "})
    } catch (error) {
        next(error)
    }
}

export const editTravelStory = async(req, res, next) => {
    const {id} = req.params
    const {title, story, visitedLoaction, imageUrl, visitedDate} = req.body
    const userId =req.user.id

    //validate required field 
if (!title || !story || !visitedLoaction || !imageUrl || !visitedDate){
    return next(errorHandlar(400, "All fields are required"))
}
// converted visited date from milliseconds to Date Objects 
const parsedVisitedDate = new Date(parseInt(visitedDate))

try {
    const travelStory = await  TravelStory.findOne({ _id: id, userId: userId })

    if(!travelStory){
        next(errorHandlar(404, "Travel Story not found!"))
    }

    const placeholderImageUrl = `http://localhost:3000/assets/placeholderImage.png`

     
    travelStory.title = title
    travelStory.story = story
    travelStory.visitedLocation = visitedLoaction
    travelStory.imageUrl = imageUrl || placeholderImageUrl
    travelStory.visitedDate = parsedVisitedDate

    await travelStory.save()

    res.status(200).json({
     story: travelStory,
     message: "Travel story updated successfully!",
    })
} catch (error) {
    next(error)
    
}
}