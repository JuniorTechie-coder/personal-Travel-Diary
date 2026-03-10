
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
      await fs.promises.unlink(filePath)

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

export const deleteTravelStory = async(req, res, next) => {
    const { id } = req.params
    const userId =req.user.id

    try {
       const travelStory = await  TravelStory.findOne({ _id: id, userId: userId }) 

       if(!travelStory){
        next(errorHandlar(404, "Travel Story not found!"))
    }

    //delete travel story from the Database 
    await travelStory.deleteOne({_id: id, userId: userId })

    //Extract the file name from the imageUrl

  const imageUrl = travelStory.imageUrl
console.log("imageUrl from DB:", imageUrl)
const filename = path.basename(imageUrl)
console.log("filename:", filename)
const filePath = path.join(rootDir, "uploads", filename)
console.log("filePath:", filePath)

    
    //chech if the file exist
    if(!fs.existsSync(filePath)){
        return next(errorHandlar(404, "image not found"))
    }

     //delete the file
      await fs.promises.unlink(filePath)

      res.status(200).json({message: "Travel story deleted successfully!"})
    } catch (error) {
        next(error)
        
    }
}

export const updateIsFavorite = async(req, res, next) => {
    const {id} = req.params
    const {isFavorite} = req.body
    const userId = req.user.id

    try {
        const travelStory = await TravelStory.findOne({ _id: id, userId: userId })

        if(!travelStory){
            return next(errorHandlar(404, "Travel Story not found!"))
        }
        travelStory.isFavorite = isFavorite 

        await travelStory.save()

        res.status(200).json({ story: travelStory, message: "Updated successfully! "})
    } catch (error) {
        next(error)
        
    }
}

export const searchTravelStory = async(req, res, next) => {
    const {query} = req.query
    const userId = req.user.id

    if(!query){
        return next(errorHandlar(404, "Query is required! "))
    }

    try {
        const searchResults = await TravelStory.find({
            userId : userId,
            $or: [
                {title: {$regex: query, $options: "i"} },
                {story: {$regex: query, $options: "i"} },    
                {visitedLocation: {$regex: query, $options: "i"} },
            ],
        }).sort({ isFavorite: -1 })

        res.status(200).json({
            stories: searchResults,
        
        })
    } catch (error) {
        next(error)
        
    }
}

export const filterTravelStories = async(req, res, next) => {
    const {startDate, endDate} = req.query
    const userId = req.user.id

    try {
        const start = new Date(parseInt(startDate))
        const end = new Date(parseInt(endDate))

        const filteredStories = await  TravelStory.find({
            userId: userId,
            visitedDate:  {$gte: start, $lte: end}
        }).sort({isFavorite: -1 })

        res.status(200).json({stories: filteredStories })
    } catch (error) {
        next(error)
        
    }
}