import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { toast, ToastContainer } from "react-toastify"
import uploadImage from "../../utils/uploadImage"

const EditProfile = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [country, setCountry] = useState("")
  const [profilePhoto, setProfilePhoto] = useState("")
  const [photoFile, setPhotoFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/get-user")
      if (response.data) {
        setUsername(response.data.username || "")
        setBio(response.data.bio || "")
        setCountry(response.data.country || "")
        setProfilePhoto(response.data.profilePhoto || "")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getUserInfo() }, [])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoFile(file)
      setProfilePhoto(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      let photoUrl = profilePhoto
      if (photoFile) {
        const uploadRes = await uploadImage(photoFile)
        photoUrl = uploadRes.imageUrl || profilePhoto
      }
      const response = await axiosInstance.put("/user/update-profile", { bio, country, profilePhoto: photoUrl })
      if (response.data) {
        toast.success("Profile updated successfully!")
        setTimeout(() => navigate("/home"), 1500)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#faf7f2" }}>
      <link href="https://fonts.googleapis.com/css2?family=Volkhov:ital,wght@0,400;0,700;1,700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <div style={{ background: "#0d1b2a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: "62px" }}>
        <span style={{ fontFamily: "'Volkhov', serif", fontSize: "22px", fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("/home")}>
          <span style={{ color: "#fff" }}>Travel</span>
          <em style={{ fontStyle: "italic", color: "#c9a84c" }}>Diary</em>
        </span>
        <button onClick={() => navigate("/home")} style={{ fontSize: "12px", color: "#a0b4c8", background: "transparent", border: "1px solid #243d57", padding: "7px 16px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
          ← Back to Home
        </button>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 62px)" }}>

        {/* Left decorative panel */}
        <div style={{ width: "380px", background: "#0d1b2a", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "40px" }}>
          <div style={{ position: "absolute", right: "-60px", top: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "#1a2d42" }} />
          <div style={{ position: "absolute", left: "-40px", bottom: "100px", width: "180px", height: "180px", borderRadius: "50%", background: "#c9a84c11" }} />
          <div style={{ position: "absolute", right: "20px", top: "80px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", opacity: 0.3 }}>
            {Array(20).fill(0).map((_, i) => (
              <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#c9a84c" }} />
            ))}
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <div style={{ width: "24px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
              <span style={{ fontSize: "11px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Account</span>
            </div>
            <h1 style={{ fontFamily: "'Volkhov', serif", fontSize: "36px", color: "#fff", fontWeight: 700, lineHeight: 1.2, marginBottom: "16px" }}>
              Your travel<br /><em style={{ fontStyle: "italic", color: "#c9a84c" }}>identity</em>
            </h1>
            <p style={{ fontSize: "13px", color: "#a0b4c8", lineHeight: 1.7, marginBottom: "32px" }}>
              Tell the world who you are. Add your photo, bio and country to connect with fellow travelers.
            </p>

            {/* Profile preview */}
            <div style={{ background: "#ffffff11", borderRadius: "14px", padding: "16px", border: "1px solid #ffffff11" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                {profilePhoto ? (
                  <img src={profilePhoto} alt="" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #c9a84c" }} />
                ) : (
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#c9a84c22", border: "2px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: "#c9a84c" }}>
                    {username ? username[0].toUpperCase() : "?"}
                  </div>
                )}
                <div>
                  <p style={{ fontSize: "14px", color: "#fff", fontWeight: 600, margin: 0 }}>{username || "Your Name"}</p>
                  <p style={{ fontSize: "11px", color: "#a0b4c8", margin: "2px 0 0" }}>{country ? `📍 ${country}` : "📍 Your Country"}</p>
                </div>
              </div>
              <p style={{ fontSize: "11px", color: "#a0b4c8", lineHeight: 1.5, margin: 0 }}>
                {bio ? bio.substring(0, 80) + (bio.length > 80 ? "..." : "") : "Your bio will appear here..."}
              </p>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
          <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e8e2d9", padding: "44px", width: "100%", maxWidth: "520px" }}>

            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "24px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Edit Profile</span>
              </div>
              <h2 style={{ fontFamily: "'Volkhov', serif", color: "#0d1b2a", fontSize: "28px", fontWeight: 700, margin: 0 }}>Update your profile</h2>
            </div>

            {/* Profile photo */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px", padding: "20px", background: "#faf7f2", borderRadius: "12px", border: "1px solid #e8e2d9" }}>
              {profilePhoto ? (
                <img src={profilePhoto} alt="" style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "3px solid #c9a84c" }} />
              ) : (
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#fdf8ec", border: "3px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: 700, color: "#c9a84c" }}>
                  {username ? username[0].toUpperCase() : "?"}
                </div>
              )}
              <div>
                <p style={{ fontSize: "13px", color: "#0d1b2a", fontWeight: 600, marginBottom: "8px" }}>Profile Photo</p>
                <p style={{ fontSize: "11px", color: "#b5a898", marginBottom: "10px" }}>Upload a clear photo of yourself</p>
                <label style={{ background: "#0d1b2a", color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                </label>
              </div>
            </div>

            {/* Username */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#b5a898", fontWeight: 600, display: "block", marginBottom: "7px" }}>Username</label>
              <input
                value={username}
                disabled
                style={{ width: "100%", background: "#faf7f2", border: "1px solid #e8e2d9", color: "#b5a898", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", outline: "none", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif" }}
              />
            </div>

            {/* Country */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#b5a898", fontWeight: 600, display: "block", marginBottom: "7px" }}>Country</label>
              <input
                placeholder="Where are you from?"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{ width: "100%", background: "#faf7f2", border: "1px solid #e8e2d9", color: "#0d1b2a", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", outline: "none", boxSizing: "border-box", fontFamily: "'Poppins', sans-serif" }}
              />
            </div>

            {/* Bio */}
            <div style={{ marginBottom: "28px" }}>
              <label style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#b5a898", fontWeight: 600, display: "block", marginBottom: "7px" }}>Bio</label>
              <textarea
                placeholder="Tell other travelers about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                style={{ width: "100%", background: "#faf7f2", border: "1px solid #e8e2d9", color: "#0d1b2a", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", outline: "none", boxSizing: "border-box", resize: "none", fontFamily: "'Poppins', sans-serif" }}
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              style={{ width: "100%", background: "#c9a84c", color: "#0d1b2a", fontSize: "13px", fontWeight: 700, letterSpacing: "1px", padding: "14px", border: "none", borderRadius: "10px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
            >
              {loading ? "Saving..." : "Save Profile →"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default EditProfile