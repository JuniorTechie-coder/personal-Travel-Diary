import React from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: "#faf7f2", minHeight: "100vh", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Volkhov:ital,wght@0,400;0,700;1,700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <div style={{ background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "64px", borderBottom: "1px solid #f0ebe3" }}>
        <span style={{ fontFamily: "'Volkhov', serif", fontSize: "24px", color: "#0d1b2a", fontWeight: 700 }}>
          Travel<span style={{ color: "#e8825a" }}>Diary</span>
        </span>
       <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
  <span
    onClick={() => navigate("/home")}
    style={{ fontSize: "13px", color: "#6b5e52", fontWeight: 500, cursor: "pointer" }}
  >Home</span>
  <span
    onClick={() => navigate("/explore")}
    style={{ fontSize: "13px", color: "#6b5e52", fontWeight: 500, cursor: "pointer" }}
  >Explore</span>
  <span
    onClick={() => navigate("/map")}
    style={{ fontSize: "13px", color: "#6b5e52", fontWeight: 500, cursor: "pointer" }}
  >Map</span>
  <span
    onClick={() => navigate("/login")}
    style={{ fontSize: "13px", color: "#6b5e52", fontWeight: 500, cursor: "pointer" }}
  >Login</span>
</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{ background: "transparent", color: "#0d1b2a", border: "1.5px solid #e8e2d9", padding: "8px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            style={{ background: "#e8825a", color: "#fff", border: "none", padding: "8px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 48px", height: "calc(100vh - 64px)", position: "relative" }}>

        {/* Background circles */}
        <div style={{ position: "absolute", right: "220px", top: "50%", transform: "translateY(-50%)", width: "420px", height: "420px", borderRadius: "50%", background: "#f5e6c8", zIndex: 0 }} />
        <div style={{ position: "absolute", right: "380px", bottom: "80px", width: "120px", height: "120px", borderRadius: "50%", background: "#fde8d8", zIndex: 0 }} />

        {/* Dot decoration */}
        <div style={{ position: "absolute", right: "50px", top: "80px", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "8px", zIndex: 1 }}>
          {Array(30).fill(0).map((_, i) => (
            <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#e8e2d9" }} />
          ))}
        </div>

        {/* Left content */}
        <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <div style={{ width: "32px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
            <span style={{ fontSize: "11px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Best Travel Journal App</span>
          </div>

          <h1 style={{ fontFamily: "'Volkhov', serif", fontSize: "52px", color: "#0d1b2a", fontWeight: 700, lineHeight: 1.15, marginBottom: "20px" }}>
            Explore, <em style={{ fontStyle: "italic", color: "#e8825a" }}>enjoy</em><br />
            and live every<br />
            journey fully
          </h1>

          <p style={{ fontSize: "14px", color: "#b5a898", lineHeight: 1.8, marginBottom: "36px", maxWidth: "400px" }}>
            Capture your travel memories, pin your adventures on the map, and share your stories with fellow travelers around the world.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
            <button
              onClick={() => navigate("/sign-up")}
              style={{ background: "#e8825a", color: "#fff", border: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{ display: "flex", alignItems: "center", gap: "10px", background: "transparent", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", color: "#0d1b2a", fontFamily: "'Poppins', sans-serif" }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#0d1b2a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}>▶</div>
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Volkhov', serif", fontSize: "30px", color: "#0d1b2a", fontWeight: 700 }}>12k+</div>
              <div style={{ fontSize: "12px", color: "#b5a898" }}>Travelers</div>
            </div>
            <div style={{ width: "1px", height: "40px", background: "#e8e2d9" }} />
            <div>
              <div style={{ fontFamily: "'Volkhov', serif", fontSize: "30px", color: "#0d1b2a", fontWeight: 700 }}>48k+</div>
              <div style={{ fontSize: "12px", color: "#b5a898" }}>Stories</div>
            </div>
            <div style={{ width: "1px", height: "40px", background: "#e8e2d9" }} />
            <div>
              <div style={{ fontFamily: "'Volkhov', serif", fontSize: "30px", color: "#0d1b2a", fontWeight: 700 }}>190+</div>
              <div style={{ fontSize: "12px", color: "#b5a898" }}>Countries</div>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div style={{ width: "480px", position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="traveler"
            style={{ width: "320px", height: "420px", objectFit: "cover", borderRadius: "200px 200px 0 0", position: "relative", zIndex: 2 }}
          />

          {/* Floating card 1 */}
          <div style={{ position: "absolute", top: "40px", left: "0px", background: "#fff", borderRadius: "14px", padding: "12px 16px", border: "1px solid #f0ebe3", zIndex: 5 }}>
            <div style={{ display: "inline-block", background: "#e8825a22", color: "#e8825a", fontSize: "9px", padding: "2px 7px", borderRadius: "4px", fontWeight: 600, marginBottom: "6px" }}>Top Story</div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#0d1b2a", marginBottom: "2px" }}>Paris Countryside</div>
            <div style={{ fontSize: "10px", color: "#b5a898" }}>📍 Paris, France · 14 Mar</div>
          </div>

          {/* Floating card 2 */}
          <div style={{ position: "absolute", bottom: "80px", right: "-10px", background: "#fff", borderRadius: "14px", padding: "12px 16px", border: "1px solid #f0ebe3", zIndex: 5 }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#0d1b2a", marginBottom: "4px" }}>Journey Rating</div>
            <div style={{ color: "#c9a84c", fontSize: "14px", marginBottom: "2px" }}>★★★★★</div>
            <div style={{ fontSize: "10px", color: "#b5a898" }}>4.9 · 2.4k reviews</div>
          </div>

          {/* Floating card 3 */}
          <div style={{ position: "absolute", bottom: "20px", left: "10px", background: "#0d1b2a", borderRadius: "14px", padding: "12px 16px", zIndex: 5 }}>
            <div style={{ fontSize: "10px", color: "#c9a84c", fontWeight: 600, marginBottom: "4px" }}>📍 New Pin Added</div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#fff" }}>London, UK</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing