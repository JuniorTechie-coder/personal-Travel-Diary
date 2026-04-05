import React from "react"
import { IoMdClose } from "react-icons/io"
import { MdOutlineDelete, MdOutlineUpdate } from "react-icons/md"
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

const ViewTravelStory = ({
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  const hasCoordinates = storyInfo?.coordinates?.lat && storyInfo?.coordinates?.lng

  return (
    <div className="relative">
      {/* Header buttons */}
      <div className="flex items-center justify-between">
        {/* Back button */}
        <button
          onClick={onClose}
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "transparent", border: "0.5px solid #a8d5cc", color: "#0a5c5a", padding: "7px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
        >
          ← Back
        </button>

        <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
          <button className="btn-small" onClick={onEditClick}>
            <MdOutlineUpdate className="text-lg" /> UPDATE STORY
          </button>
          <button className="btn-small btn-delete" onClick={onDeleteClick}>
            <MdOutlineDelete className="text-lg" /> DELETE STORY
          </button>
          <button className="cursor-pointer" onClick={onClose}>
            <IoMdClose className="text-lg text-slate-400" />
          </button>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
          <h1 className="text-2xl text-slate-950">
            {storyInfo && storyInfo.title}
          </h1>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
            </span>

            <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded-sm px-2 py-1">
              <FaLocationDot className="text-sm" />
              {storyInfo &&
                storyInfo.visitedLocation.map((item, index) =>
                  storyInfo.visitedLocation.length === index + 1
                    ? `${item}`
                    : `${item},`
                )}
            </div>
          </div>
        </div>

        <img
          src={storyInfo && storyInfo.imageUrl}
          alt="story image"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        <div className="mt-4">
          <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">
            {storyInfo.story}
          </p>
        </div>

        {/* Map section */}
        {hasCoordinates && (
          <div style={{ marginTop: "24px" }}>
            <p style={{ fontSize: "10px", color: "#5a9e97", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>
              📍 Story Location
            </p>
            <div style={{ height: "220px", borderRadius: "12px", overflow: "hidden", border: "0.5px solid #a8d5cc" }}>
              <MapContainer
                center={[storyInfo.coordinates.lat, storyInfo.coordinates.lng]}
                zoom={10}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[storyInfo.coordinates.lat, storyInfo.coordinates.lng]} />
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewTravelStory