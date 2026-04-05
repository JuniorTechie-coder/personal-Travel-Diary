import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import moment from "moment"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

const Map = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStory, setSelectedStory] = useState(null)
  const navigate = useNavigate()

  const getAllStories = async () => {
    try {
      const response = await axiosInstance.get("/travel-story/get-all")
      if (response.data && response.data.stories) {
        const storiesWithCoords = response.data.stories.filter(
          (s) => s.coordinates && s.coordinates.lat && s.coordinates.lng
        )
        setStories(storiesWithCoords)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getAllStories() }, [])

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", height: "100vh", display: "flex", flexDirection: "column", background: "#faf7f2" }}>
      <link href="https://fonts.googleapis.com/css2?family=Volkhov:ital,wght@0,400;0,700;1,700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <div style={{ background: "#0d1b2a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: "62px", flexShrink: 0 }}>
        <span style={{ fontFamily: "'Volkhov', serif", fontSize: "22px", fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("/home")}>
          <span style={{ color: "#fff" }}>Travel</span>
          <em style={{ fontStyle: "italic", color: "#c9a84c" }}>Diary</em>
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => navigate("/home")} style={{ fontSize: "12px", color: "#a0b4c8", background: "transparent", border: "none", padding: "7px 14px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>🏠 Home</button>
          <button onClick={() => navigate("/explore")} style={{ fontSize: "12px", color: "#a0b4c8", background: "transparent", border: "none", padding: "7px 14px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>🌍 Explore</button>
          <button onClick={() => navigate("/map")} style={{ fontSize: "12px", color: "#0d1b2a", background: "#c9a84c", border: "none", padding: "7px 16px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>🗺️ Map</button>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Left sidebar */}
        <div style={{ width: "300px", background: "#fff", borderRight: "1px solid #e8e2d9", display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ padding: "24px 20px", borderBottom: "1px solid #e8e2d9", background: "#0d1b2a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "20px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
              <span style={{ fontSize: "10px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Explore</span>
            </div>
            <h2 style={{ fontFamily: "'Volkhov', serif", fontSize: "22px", color: "#fff", fontWeight: 700, margin: "0 0 4px" }}>Your Travel Map</h2>
            <p style={{ fontSize: "12px", color: "#a0b4c8", margin: 0 }}>
              {stories.length} {stories.length === 1 ? "location" : "locations"} pinned
            </p>
          </div>

          {/* Story list */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#b5a898" }}>Loading...</div>
            ) : stories.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <span style={{ fontSize: "36px" }}>📍</span>
                <p style={{ fontSize: "13px", color: "#b5a898", marginTop: "12px", lineHeight: 1.6 }}>No locations pinned yet. Add a location when creating a story!</p>
                <button
                  onClick={() => navigate("/home")}
                  style={{ background: "#c9a84c", color: "#0d1b2a", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600, marginTop: "12px" }}
                >
                  Add Story →
                </button>
              </div>
            ) : (
              <>
                <p style={{ fontSize: "10px", color: "#b5a898", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Pinned Stories</p>
                {stories.map((story, index) => (
                  <div
                    key={story._id}
                    onClick={() => setSelectedStory(story)}
                    style={{ display: "flex", gap: "12px", padding: "12px", borderRadius: "10px", cursor: "pointer", marginBottom: "8px", border: `1px solid ${selectedStory?._id === story._id ? "#c9a84c" : "#f0ebe3"}`, background: selectedStory?._id === story._id ? "#fdf8ec" : "#fff" }}
                    onMouseEnter={(e) => { if (selectedStory?._id !== story._id) e.currentTarget.style.borderColor = "#c9a84c" }}
                    onMouseLeave={(e) => { if (selectedStory?._id !== story._id) e.currentTarget.style.borderColor = "#f0ebe3" }}
                  >
                    <img src={story.imageUrl} alt="" style={{ width: "52px", height: "52px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <p style={{ fontFamily: "'Volkhov', serif", fontSize: "13px", color: "#0d1b2a", fontWeight: 700, margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{story.title}</p>
                      <p style={{ fontSize: "11px", color: "#b5a898", margin: "0 0 4px" }}>{moment(story.visitedDate).format("DD MMM YYYY")}</p>
                      <p style={{ fontSize: "11px", color: "#c9a84c", fontWeight: 600, margin: 0 }}>
                        📍 {story.coordinates.lat.toFixed(2)}, {story.coordinates.lng.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Selected story preview */}
          {selectedStory && (
            <div style={{ borderTop: "1px solid #e8e2d9", padding: "16px", background: "#faf7f2" }}>
              <p style={{ fontSize: "10px", color: "#b5a898", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "10px" }}>Selected Story</p>
              <img src={selectedStory.imageUrl} alt="" style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
              <p style={{ fontFamily: "'Volkhov', serif", fontSize: "14px", color: "#0d1b2a", fontWeight: 700, margin: "0 0 4px" }}>{selectedStory.title}</p>
              <p style={{ fontSize: "11px", color: "#b5a898", margin: "0 0 10px" }}>{moment(selectedStory.visitedDate).format("DD MMM YYYY")}</p>
              <button
                onClick={() => navigate("/home")}
                style={{ width: "100%", background: "#0d1b2a", color: "#fff", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}
              >
                View Full Story →
              </button>
            </div>
          )}
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: "relative" }}>
          {stories.length === 0 && !loading ? (
            <div style={{ height: "100%", background: "#e8e2d9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <span style={{ fontSize: "64px" }}>🗺️</span>
              <p style={{ fontFamily: "'Volkhov', serif", fontSize: "24px", color: "#0d1b2a" }}>No locations pinned yet</p>
              <p style={{ fontSize: "13px", color: "#b5a898" }}>Add a location when creating a travel story</p>
            </div>
          ) : (
            <MapContainer
              center={stories.length > 0 ? [stories[0].coordinates.lat, stories[0].coordinates.lng] : [20, 0]}
              zoom={stories.length > 0 ? 5 : 2}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {stories.map((story) => (
                <Marker
                  key={story._id}
                  position={[story.coordinates.lat, story.coordinates.lng]}
                  eventHandlers={{ click: () => setSelectedStory(story) }}
                >
                  <Popup>
                    <div style={{ fontFamily: "'Poppins', sans-serif", width: "200px" }}>
                      {story.imageUrl && (
                        <img src={story.imageUrl} alt="" style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px" }} />
                      )}
                      <p style={{ fontFamily: "'Volkhov', serif", fontSize: "15px", fontWeight: 700, color: "#0d1b2a", margin: "0 0 4px" }}>{story.title}</p>
                      <p style={{ fontSize: "11px", color: "#b5a898", margin: "0 0 8px" }}>{moment(story.visitedDate).format("DD MMM YYYY")}</p>
                      <p style={{ fontSize: "12px", color: "#6b5e52", margin: "0 0 10px", lineHeight: 1.5 }}>{story.story?.substring(0, 60)}...</p>
                      <button
                        onClick={() => navigate("/home")}
                        style={{ background: "#c9a84c", color: "#0d1b2a", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}
                      >
                        View Story →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  )
}

export default Map