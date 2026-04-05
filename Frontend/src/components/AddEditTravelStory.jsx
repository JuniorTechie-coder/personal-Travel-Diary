import React, { useState } from "react"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import { MdOutlineDeleteOutline, MdOutlineUpdate, MdMyLocation } from "react-icons/md"
import DateSelector from "./DateSelector"
import ImageSelector from "./ImageSelector"
import TagInput from "./TagInput"
import axiosInstance from "../utils/axiosInstance"
import moment from "moment"
import { toast } from "react-toastify"
import uploadImage from "../utils/uploadImage"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

// Component to handle map clicks
const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
  return null
}

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null)
  const [title, setTitle] = useState(storyInfo?.title || "")
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null)
  const [story, setStory] = useState(storyInfo?.story || "")
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || [])
  const [coordinates, setCoordinates] = useState(
    storyInfo?.coordinates || { lat: null, lng: null }
  )
  const [showMapPicker, setShowMapPicker] = useState(false)
  const [cityInput, setCityInput] = useState(
    storyInfo?.coordinates?.lat
      ? `${storyInfo.coordinates.lat.toFixed(4)}, ${storyInfo.coordinates.lng.toFixed(4)}`
      : ""
  )
  const [isPublic, setIsPublic] = useState(storyInfo?.isPublic || false)
  const [error, setError] = useState("")

  // Search city by name using OpenStreetMap Nominatim
  const searchCity = async () => {
    if (!cityInput) return
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityInput)}`
      )
      const data = await response.json()
      if (data && data.length > 0) {
        const { lat, lon } = data[0]
        setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) })
        toast.success(`Location found: ${data[0].display_name.split(",")[0]}`)
      } else {
        toast.error("Location not found. Try a different name.")
      }
    } catch (error) {
      toast.error("Error searching location.")
    }
  }

  const addNewTravelStory = async () => {
    try {
      let imageUrl = ""
      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg)
        imageUrl = imgUploadRes.imageUrl || ""
      }

      const response = await axiosInstance.post("/travel-story/add", {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
        coordinates,
        isPublic,
      })

      if (response.data && response.data.story) {
        toast.success("Story added successfully!")
        getAllTravelStories()
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateTravelStory = async () => {
    const storyId = storyInfo._id
    try {
      let imageUrl = ""
      let postData = {
        title,
        story,
        imageUrl: storyInfo.imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
        coordinates,
        isPublic,
      }

      if (typeof storyImg === "object") {
        const imageUploadRes = await uploadImage(storyImg)
        imageUrl = imageUploadRes.imageUrl || ""
        postData = { ...postData, imageUrl }
      }

      const response = await axiosInstance.post(
        "/travel-story/edit-story/" + storyId,
        postData
      )

      if (response.data && response.data.story) {
        toast.success("Story updated successfully!")
        getAllTravelStories()
        onClose()
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong! Please try again.")
      }
    }
  }

  const handleAddOrUpdateClick = () => {
    if (!title) {
      setError("Please enter the title")
      return
    }
    if (!story) {
      setError("Please enter the story")
      return
    }
    setError("")
    if (type === "edit") {
      updateTravelStory()
    } else {
      addNewTravelStory()
    }
  }

  const handleDeleteStoryImage = async () => {
    const deleteImageResponse = await axiosInstance.delete(
      "/travel-story/delete-image",
      { params: { imageUrl: storyInfo.imageUrl } }
    )
    if (deleteImageResponse.data) {
      const storyId = storyInfo._id
      const postData = {
        title,
        story,
        visitedLocation,
        visitedDate: moment().valueOf(),
        imageUrl: "",
        coordinates,
      }
      const response = await axiosInstance.post(
        "/travel-story/edit-story/" + storyId,
        postData
      )
      if (response.data) {
        toast.success("Story image deleted successfully")
        setStoryImg(null)
        getAllTravelStories()
      }
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <IoMdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdOutlineUpdate className="text-lg" /> UPDATE STORY
                </button>
                <button className="btn-small btn-delete">
                  <MdOutlineDeleteOutline className="text-lg" /> DELETE STORY
                </button>
              </>
            )}
            <button onClick={onClose}>
              <IoMdClose className="text-xl text-slate-400" />
            </button>
          </div>
          {error && <p className="text-red-500 text-xs pt-2 text-right">{error}</p>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 pt-4">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-900 outline-none"
          placeholder="Once Upon A Time..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="my-3">
          <DateSelector date={visitedDate} setDate={setVisitedDate} />
        </div>

        <ImageSelector
          image={storyImg}
          setImage={setStoryImg}
          handleDeleteImage={handleDeleteStoryImage}
        />

        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">STORY</label>
          <textarea
            className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded-sm"
            placeholder="Your Story"
            rows={10}
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        <div className="pt-3">
          <label className="input-label">VISITED LOCATIONS</label>
          <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
        </div>
       

{/* Public/Private toggle - ADD HERE */}
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f0fdf9", border: "0.5px solid #a8d5cc", borderRadius: "8px", padding: "12px 16px", marginTop: "12px" }}>
  <div>
    <p style={{ fontSize: "13px", color: "#0a2020", fontWeight: 500, margin: 0 }}>Make this story public</p>
    <p style={{ fontSize: "11px", color: "#5a9e97", margin: "2px 0 0" }}>Public stories are visible to other travelers</p>
  </div>
  <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
    <input
      type="checkbox"
      checked={isPublic}
      onChange={(e) => setIsPublic(e.target.checked)}
      style={{ opacity: 0, width: 0, height: 0 }}
    />
    <span style={{ position: "absolute", cursor: "pointer", inset: 0, background: isPublic ? "#0bbfb0" : "#a8d5cc", borderRadius: "24px", transition: "0.3s" }}>
      <span style={{ position: "absolute", height: "18px", width: "18px", left: isPublic ? "23px" : "3px", bottom: "3px", background: "#fff", borderRadius: "50%", transition: "0.3s" }} />
    </span>
  </label>
</div>

{/* Location picker section */}

        {/* Location picker section */}
        <div className="pt-3">
          <label className="input-label">PIN LOCATION ON MAP</label>

          {/* City search */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px", marginTop: "8px" }}>
            <input
              type="text"
              placeholder="Type city or country name..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchCity()}
              style={{ flex: 1, padding: "8px 12px", borderRadius: "8px", border: "0.5px solid #a8d5cc", outline: "none", fontSize: "13px", background: "#f0fdf9" }}
            />
            <button
              onClick={searchCity}
              style={{ background: "#0bbfb0", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
            >
              Search
            </button>
            <button
              onClick={() => setShowMapPicker(!showMapPicker)}
              style={{ background: "#d4860a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}
            >
              <MdMyLocation /> {showMapPicker ? "Hide Map" : "Pick on Map"}
            </button>
          </div>

          {coordinates.lat && (
            <p style={{ fontSize: "11px", color: "#0bbfb0", marginBottom: "8px" }}>
              📍 Location pinned: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              <span
                onClick={() => setCoordinates({ lat: null, lng: null })}
                style={{ color: "#e05252", marginLeft: "8px", cursor: "pointer" }}
              >
                ✕ Remove
              </span>
            </p>
          )}

          {/* Map picker */}
          {showMapPicker && (
            <div style={{ height: "250px", borderRadius: "10px", overflow: "hidden", border: "0.5px solid #a8d5cc", marginTop: "8px" }}>
              <MapContainer
                center={coordinates.lat ? [coordinates.lat, coordinates.lng] : [20, 0]}
                zoom={coordinates.lat ? 8 : 2}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPicker onLocationSelect={setCoordinates} />
                {coordinates.lat && (
                  <Marker position={[coordinates.lat, coordinates.lng]} />
                )}
              </MapContainer>
            </div>
          )}
          <p style={{ fontSize: "11px", color: "#5a9e97", marginTop: "6px" }}>
            Search by city name or click on the map to pin your location
          </p>
        </div>
      </div>
    </div>
  )
}

export default AddEditTravelStory