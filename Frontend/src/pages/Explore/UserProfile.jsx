import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { getInitials } from "../../utils/helper"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import moment from "moment"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

const UserProfile = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("stories")

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get(`/user/profile/${userId}`)
      if (response.data) {
        setUser(response.data.user)
        setStories(response.data.stories)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getUserProfile() }, [userId])

  const storiesWithCoords = stories.filter(s => s.coordinates?.lat && s.coordinates?.lng)

  const badgeColors = ["#e8825a", "#c9a84c", "#0d1b2a", "#2e5c4a", "#5a3a8a"]

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#faf7f2", fontFamily: "'Poppins', sans-serif", color: "#b5a898" }}>
      Loading profile...
    </div>
  )

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#faf7f2" }}>
      <link href="https://fonts.googleapis.com/css2?family=Volkhov:ital,wght@0,400;0,700;1,700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <div style={{ background: "#0d1b2a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: "62px" }}>
        <span style={{ fontFamily: "'Volkhov', serif", fontSize: "22px", fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("/home")}>
          <span style={{ color: "#fff" }}>Travel</span>
          <em style={{ fontStyle: "italic", color: "#c9a84c" }}>Diary</em>
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => navigate("/home")} style={{ fontSize: "12px", color: "#a0b4c8", background: "transparent", border: "none", padding: "7px 14px", borderRadius: "6px", cursor: "pointer" }}>🏠 Home</button>
          <button onClick={() => navigate("/explore")} style={{ fontSize: "12px", color: "#a0b4c8", background: "transparent", border: "none", padding: "7px 14px", borderRadius: "6px", cursor: "pointer" }}>🌍 Explore</button>
        </div>
      </div>

      {/* Profile Hero */}
      <div style={{ background: "#0d1b2a", position: "relative", overflow: "hidden" }}>
        {/* Background decorations */}
        <div style={{ position: "absolute", right: "-40px", top: "-40px", width: "250px", height: "250px", borderRadius: "50%", background: "#1a2d42" }} />
        <div style={{ position: "absolute", left: "0", bottom: "0", width: "150px", height: "150px", borderRadius: "50%", background: "#c9a84c11" }} />

        <div style={{ position: "relative", zIndex: 1, padding: "40px 40px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "28px", paddingBottom: "0" }}>

            {/* Avatar */}
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "4px solid #c9a84c", flexShrink: 0 }} />
            ) : (
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "#1a2d42", border: "4px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", fontWeight: 700, color: "#c9a84c", flexShrink: 0 }}>
                {getInitials(user?.username)}
              </div>
            )}

            {/* User info */}
            <div style={{ flex: 1, paddingBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ width: "20px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
                <span style={{ fontSize: "10px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Traveler Profile</span>
              </div>
              <h1 style={{ fontFamily: "'Volkhov', serif", fontSize: "32px", color: "#fff", fontWeight: 700, margin: "0 0 6px" }}>{user?.username}</h1>
              {user?.country && <p style={{ fontSize: "13px", color: "#a0b4c8", margin: "0 0 8px" }}>📍 {user.country}</p>}
              {user?.bio && <p style={{ fontSize: "13px", color: "#a0b4c8", lineHeight: 1.6, margin: 0, maxWidth: "500px" }}>{user.bio}</p>}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "16px", paddingBottom: "24px" }}>
              {[
                { num: stories.length, label: "Public Stories" },
                { num: storiesWithCoords.length, label: "Locations" },
              ].map((stat, i) => (
                <div key={i} style={{ background: "#ffffff11", border: "1px solid #ffffff11", borderRadius: "12px", padding: "16px 24px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Volkhov', serif", fontSize: "28px", color: "#c9a84c", fontWeight: 700 }}>{stat.num}</div>
                  <div style={{ fontSize: "10px", color: "#a0b4c8", letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0", marginTop: "8px" }}>
            {["stories", "map"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ padding: "14px 28px", border: "none", background: "transparent", cursor: "pointer", fontSize: "13px", fontWeight: 600, color: activeTab === tab ? "#c9a84c" : "#a0b4c8", borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent", fontFamily: "'Poppins', sans-serif" }}
              >
                {tab === "stories" ? `📖 Stories (${stories.length})` : `🗺️ Map (${storiesWithCoords.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
        {activeTab === "stories" && (
          stories.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <span style={{ fontSize: "48px" }}>📖</span>
              <p style={{ fontFamily: "'Volkhov', serif", fontSize: "20px", color: "#0d1b2a", marginTop: "16px" }}>No public stories yet</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {stories.map((item, index) => (
                <div
                  key={item._id}
                  style={{ background: "#fff", border: "1px solid #e8e2d9", borderRadius: "14px", overflow: "hidden", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#c9a84c"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e8e2d9"}
                >
                  <div style={{ position: "relative" }}>
                    <img src={item.imageUrl} alt="" style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, #0d1b2a99 100%)" }} />
                    <div style={{ position: "absolute", top: "10px", left: "10px", background: badgeColors[index % badgeColors.length] + "ee", color: "#fff", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", padding: "3px 9px", borderRadius: "4px", fontWeight: 700 }}>
                      {item.visitedLocation?.[0] || "Journey"}
                    </div>
                    {item.isFavorite && (
                      <div style={{ position: "absolute", top: "10px", right: "10px", width: "28px", height: "28px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#e05252" }}>♥</div>
                    )}
                    <div style={{ position: "absolute", bottom: "10px", right: "10px", fontSize: "10px", color: "#ffffffbb" }}>
                      {moment(item.visitedDate).format("DD MMM YYYY")}
                    </div>
                  </div>
                  <div style={{ padding: "14px" }}>
                    <div style={{ fontFamily: "'Volkhov', serif", fontSize: "15px", color: "#0d1b2a", fontWeight: 700, marginBottom: "6px" }}>{item.title}</div>
                    <div style={{ fontSize: "11px", color: "#b5a898", lineHeight: 1.6, marginBottom: "10px" }}>{item.story?.substring(0, 70)}...</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f0ebe3", paddingTop: "10px" }}>
                      <div style={{ fontSize: "11px", color: "#6b5e52" }}>
                        {item.visitedLocation?.length > 0 ? `📍 ${item.visitedLocation[0]}` : "📍 No location"}
                      </div>
                      <div style={{ fontSize: "11px", color: "#c9a84c", fontWeight: 700 }}>Read →</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === "map" && (
          storiesWithCoords.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <span style={{ fontSize: "48px" }}>🗺️</span>
              <p style={{ fontFamily: "'Volkhov', serif", fontSize: "20px", color: "#0d1b2a", marginTop: "16px" }}>No locations pinned yet</p>
            </div>
          ) : (
            <div style={{ height: "500px", borderRadius: "16px", overflow: "hidden", border: "1px solid #e8e2d9" }}>
              <MapContainer
                center={[storiesWithCoords[0].coordinates.lat, storiesWithCoords[0].coordinates.lng]}
                zoom={4}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {storiesWithCoords.map((story) => (
                  <Marker key={story._id} position={[story.coordinates.lat, story.coordinates.lng]}>
                    <Popup>
                      <div style={{ fontFamily: "'Poppins', sans-serif", width: "180px" }}>
                        {story.imageUrl && <img src={story.imageUrl} alt="" style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px" }} />}
                        <p style={{ fontFamily: "'Volkhov', serif", fontSize: "14px", fontWeight: 700, color: "#0d1b2a", margin: "0 0 4px" }}>{story.title}</p>
                        <p style={{ fontSize: "11px", color: "#b5a898", margin: 0 }}>{moment(story.visitedDate).format("DD MMM YYYY")}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default UserProfile