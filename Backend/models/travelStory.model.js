import mongoose from "mongoose"


const travelStorySchema = new  mongoose.Schema({
    title: {
        type: String,
        required: true,
     },

     story: {
        type: String,
        required: true,
     },

     visitedLocation: {
        type: [String],
        default: []
     },

     isFavorite: {
        type: Boolean,
        default: false,
     },

     userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
     },

     imageUrl: {
        type: String,
        required: true,
     },

     coordinates: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
     },

     isPublic: {
        type: Boolean,
        default: false,
     },

     visitedDate: {
        type: Date,
        required: true,
     },

}, 
   {timestamps: true }
)

const TravelStory = mongoose.model("TravelStory", travelStorySchema)

export default TravelStory