import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/slice/userSlice'
import axiosInstance from '../utils/axiosInstance'
import { getInitials } from '../utils/helper'

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout")
    } catch (error) {
      console.log(error)
    }
    dispatch(signOutSuccess())
    navigate("/login")
  }

  return (
    <div style={{ background: "#0bbfb0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Logo */}
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("/")}>
        <span style={{ color: "#fff" }}>Travel</span>
        <span style={{ color: "#fff176" }}>Diary</span>
      </span>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", background: "#09a89a", border: "0.5px solid #07918499", borderRadius: "24px", padding: "8px 18px", gap: "8px", width: "240px" }}>
        <span style={{ color: "#b2f0eb", fontSize: "14px" }}>⌕</span>
        <input
          placeholder="Search stories..."
          onChange={(e) => {
            if (e.target.value) {
              onSearchNote(e.target.value)
            } else {
              handleClearSearch()
            }
          }}
          style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "13px", width: "100%", fontFamily: "'Poppins', sans-serif" }}
        />
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={() => navigate("/map")} style={{ fontSize: "12px", color: "#fff", background: "transparent", border: "0.5px solid #ffffff66", padding: "7px 14px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
          🗺️ Map
        </button>
        <button onClick={() => navigate("/explore")} style={{ fontSize: "12px", color: "#fff", background: "transparent", border: "0.5px solid #ffffff66", padding: "7px 14px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
          🌍 Explore
        </button>
        <button onClick={() => navigate("/edit-profile")} style={{ fontSize: "12px", color: "#fff", background: "transparent", border: "0.5px solid #ffffff66", padding: "7px 14px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
          ✏️ Profile
        </button>

        {/* Avatar */}
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#fff176", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#0bbfb0", marginLeft: "4px" }}>
          {userInfo ? getInitials(userInfo.username) : "?"}
        </div>
        <span style={{ fontSize: "13px", color: "#fff", fontWeight: 500 }}>
          {userInfo ? userInfo.username : ""}
        </span>
        <button onClick={handleLogout} style={{ fontSize: "11px", color: "#0bbfb0", cursor: "pointer", background: "#fff", border: "none", padding: "7px 18px", borderRadius: "6px", fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar