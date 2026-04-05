import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { getInitials } from "../../utils/helper"

const Explore = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/user/all-users")
      if (response.data && response.data.users) {
        setUsers(response.data.users)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.country?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalStories = users.reduce((sum, u) => sum + (u.storyCount || 0), 0)
  const totalCountries = [...new Set(users.map(u => u.country).filter(Boolean))].length

  const coverColors = [
    "linear-gradient(135deg, #0d1b2a, #1a3a5c)",
    "linear-gradient(135deg, #c9a84c, #a07830)",
    "linear-gradient(135deg, #e8825a, #c05a38)",
    "linear-gradient(135deg, #2e5c4a, #1a3a2c)",
    "linear-gradient(135deg, #5a3a8a, #3a1a6a)",
    "linear-gradient(135deg, #8a3a3a, #6a1a1a)",
  ]

  const avatarColors = ["#c9a84c", "#e8825a", "#0d1b2a", "#2e5c4a", "#5a3a8a", "#8a3a3a"]

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
          <button onClick={() => navigate("/home")} style={{ fontSize: "12px", color: "#a0b4c8", background: "transparent", border: "none", padding: "7px 14px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>🏠 Home</button>
          <button onClick={() => navigate("/map")} style={{ fontSize: "12px", color: "#a0b4c8", background: "transparent", border: "none", padding: "7px 14px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>🗺️ Map</button>
          <button onClick={() => navigate("/explore")} style={{ fontSize: "12px", color: "#0d1b2a", background: "#c9a84c", border: "none", padding: "7px 16px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>🌍 Explore</button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: "#0d1b2a", padding: "48px 40px 64px", position: "relative", overflow: "hidden" }}>
        {/* Background decorations */}
        <div style={{ position: "absolute", right: "-60px", top: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "#1a2d42", opacity: 0.6 }} />
        <div style={{ position: "absolute", right: "200px", bottom: "-80px", width: "200px", height: "200px", borderRadius: "50%", background: "#c9a84c11" }} />

        {/* Dot decoration */}
        <div style={{ position: "absolute", left: "40px", bottom: "20px", display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "6px", opacity: 0.3 }}>
          {Array(24).fill(0).map((_, i) => (
            <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#c9a84c" }} />
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <div style={{ width: "28px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
            <span style={{ fontSize: "11px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Community</span>
          </div>

          <h1 style={{ fontFamily: "'Volkhov', serif", fontSize: "38px", color: "#fff", fontWeight: 700, marginBottom: "10px", lineHeight: 1.2 }}>
            Meet Fellow <em style={{ fontStyle: "italic", color: "#c9a84c" }}>Travelers</em> ✈️
          </h1>
          <p style={{ fontSize: "14px", color: "#a0b4c8", marginBottom: "28px", maxWidth: "500px", lineHeight: 1.7 }}>
            Discover incredible journeys and stories from travelers around the world
          </p>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", background: "#1a2d42", border: "1px solid #243d57", borderRadius: "10px", padding: "12px 20px", gap: "10px", width: "380px", marginBottom: "32px" }}>
            <span style={{ color: "#4a6580", fontSize: "16px" }}>⌕</span>
            <input
              placeholder="Search by name or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "13px", width: "100%", fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { num: users.length, label: "Travelers" },
              { num: totalStories, label: "Public Stories" },
              { num: totalCountries, label: "Countries" },
            ].map((stat, i) => (
              <div key={i} style={{ background: "#ffffff11", border: "1px solid #ffffff11", borderRadius: "10px", padding: "14px 24px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Volkhov', serif", fontSize: "26px", color: "#c9a84c", fontWeight: 700 }}>{stat.num}</div>
                <div style={{ fontSize: "10px", color: "#a0b4c8", letterSpacing: "1px", textTransform: "uppercase", marginTop: "2px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ padding: "36px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <div style={{ width: "24px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
          <span style={{ fontSize: "11px", color: "#e8825a", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>All Travelers</span>
        </div>
        <h2 style={{ fontFamily: "'Volkhov', serif", fontSize: "22px", color: "#0d1b2a", fontWeight: 700, marginBottom: "24px" }}>
          {filteredUsers.length} travelers found
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#b5a898" }}>Loading travelers...</div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <span style={{ fontSize: "48px" }}>🌍</span>
            <p style={{ fontFamily: "'Volkhov', serif", fontSize: "20px", color: "#0d1b2a", marginTop: "16px" }}>No travelers found</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
            {filteredUsers.map((user, index) => (
              <div
                key={user._id}
                onClick={() => navigate(`/user/${user._id}`)}
                style={{ background: "#fff", border: "1px solid #e8e2d9", borderRadius: "16px", overflow: "hidden", cursor: "pointer" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#c9a84c"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e8e2d9"}
              >
                {/* Cover */}
                <div style={{ height: "80px", background: coverColors[index % coverColors.length], position: "relative" }}>
                  {user.profilePhoto ? (
                    <img src={user.profilePhoto} alt="" style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover", border: "3px solid #fff", position: "absolute", bottom: "-30px", left: "20px" }} />
                  ) : (
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#fff", border: "3px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: 700, color: avatarColors[index % avatarColors.length], position: "absolute", bottom: "-30px", left: "20px" }}>
                      {getInitials(user.username)}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: "36px 16px 16px" }}>
                  <div style={{ display: "inline-block", background: user.storyCount > 0 ? "#fdf8ec" : "#f5f0e8", color: user.storyCount > 0 ? "#c9a84c" : "#8b7355", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", padding: "3px 8px", borderRadius: "4px", fontWeight: 600, marginBottom: "8px" }}>
                    {user.storyCount > 0 ? "Active Traveler" : "New Member"}
                  </div>
                  <p style={{ fontFamily: "'Volkhov', serif", fontSize: "16px", color: "#0d1b2a", fontWeight: 700, margin: "0 0 4px" }}>{user.username}</p>
                  {user.country && <p style={{ fontSize: "11px", color: "#b5a898", margin: "0 0 8px" }}>📍 {user.country}</p>}
                  {user.bio && (
                    <p style={{ fontSize: "11px", color: "#6b5e52", lineHeight: 1.6, margin: "0 0 12px" }}>
                      {user.bio.substring(0, 80)}{user.bio.length > 80 ? "..." : ""}
                    </p>
                  )}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f0ebe3", paddingTop: "10px" }}>
                    <span style={{ fontSize: "11px", color: "#b5a898" }}>🗺️ {user.storyCount} public {user.storyCount === 1 ? "story" : "stories"}</span>
                    <span style={{ fontSize: "11px", color: "#c9a84c", fontWeight: 700 }}>View Profile →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore