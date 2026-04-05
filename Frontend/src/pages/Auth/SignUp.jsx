import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axiosInstance from '../../utils/axiosInstance'
import { validateEmail } from '../../utils/helper'
import PasswordInput from '../../components/PasswordInput'

const SignUp = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username) { setError("Please enter your name."); return }
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return }
    if (!password) { setError("Please enter your password."); return }
    setError("")
    try {
      const response = await axiosInstance.post("/auth/signup", { username, email, password })
      if (response.data) {
        navigate("/login")
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong, please try again.")
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", display: "flex", flexDirection: "column", fontFamily: "'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Volkhov:ital,wght@0,400;0,700;1,700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <div style={{ background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: "64px", borderBottom: "1px solid #f0ebe3" }}>
        <span onClick={() => navigate("/")} style={{ fontFamily: "'Volkhov', serif", fontSize: "24px", color: "#0d1b2a", fontWeight: 700, cursor: "pointer" }}>
          Travel<span style={{ color: "#e8825a" }}>Diary</span>
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/")} style={{ background: "transparent", color: "#6b5e52", border: "none", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>← Back to Home</button>
          <button onClick={() => navigate("/login")} style={{ background: "#0d1b2a", color: "#fff", border: "none", padding: "8px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Login</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 48px" }}>
        <div style={{ display: "flex", width: "100%", maxWidth: "1000px", height: "600px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px #0d1b2a22" }}>

          {/* Left panel */}
          <div style={{ flex: 1.3, position: "relative", overflow: "hidden" }}>
            <img
              src="https://images.pexels.com/photos/1051073/pexels-photo-1051073.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d1b2a33 0%, #0d1b2acc 100%)" }} />

            {/* Top logo */}
            <div style={{ position: "absolute", top: "28px", left: "28px", zIndex: 2 }}>
              <span style={{ fontFamily: "'Volkhov', serif", fontSize: "22px", fontWeight: 700 }}>
                <span style={{ color: "#fff" }}>Travel</span>
                <em style={{ fontStyle: "italic", color: "#c9a84c" }}>Diary</em>
              </span>
            </div>

            {/* Bottom content */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "36px", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "24px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
                <span style={{ fontSize: "10px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Join Us Today</span>
              </div>
              <h1 style={{ fontFamily: "'Volkhov', serif", fontSize: "36px", fontWeight: 700, color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>
                Start your travel<br /><em style={{ fontStyle: "italic", color: "#c9a84c" }}>journal</em> today
              </h1>
              <p style={{ fontSize: "13px", fontWeight: 300, color: "#ffffffcc", margin: "0 0 28px", lineHeight: 1.7 }}>
                Join thousands of travelers sharing their stories and adventures from around the world.
              </p>

              {/* Stats */}
              <div style={{ display: "flex", gap: "24px" }}>
                {[
                  { num: "12k+", label: "Travelers" },
                  { num: "48k+", label: "Stories" },
                  { num: "190+", label: "Countries" },
                ].map((stat, i) => (
                  <div key={i} style={{ background: "#ffffff22", borderRadius: "10px", padding: "10px 16px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Volkhov', serif", fontSize: "20px", color: "#c9a84c", fontWeight: 700 }}>{stat.num}</div>
                    <div style={{ fontSize: "10px", color: "#ffffffcc", letterSpacing: "1px", textTransform: "uppercase" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 44px" }}>

            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "28px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Get Started</span>
              </div>
              <h2 style={{ fontFamily: "'Volkhov', serif", color: "#0d1b2a", fontSize: "30px", fontWeight: 700, margin: "0 0 6px" }}>Create your<br />account</h2>
              <p style={{ color: "#b5a898", fontSize: "13px", margin: 0, lineHeight: 1.6 }}>Start capturing your travel memories today</p>
            </div>

            <form onSubmit={handleSubmit}>
              <label style={{ fontSize: "10px", letterSpacing: "1.8px", textTransform: "uppercase", color: "#b5a898", marginBottom: "7px", display: "block", fontWeight: 600 }}>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%", background: "#faf7f2", border: "1px solid #e8e2d9", color: "#0d1b2a", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", outline: "none", boxSizing: "border-box", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" }}
              />

              <label style={{ fontSize: "10px", letterSpacing: "1.8px", textTransform: "uppercase", color: "#b5a898", marginBottom: "7px", display: "block", fontWeight: 600 }}>Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", background: "#faf7f2", border: "1px solid #e8e2d9", color: "#0d1b2a", fontSize: "14px", padding: "12px 16px", borderRadius: "8px", outline: "none", boxSizing: "border-box", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" }}
              />

              <label style={{ fontSize: "10px", letterSpacing: "1.8px", textTransform: "uppercase", color: "#b5a898", marginBottom: "7px", display: "block", fontWeight: 600 }}>Password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: "#faf7f2", border: "1px solid #e8e2d9", borderRadius: "8px", marginBottom: "16px" }}
              />

              {error && <p style={{ color: "#e05252", fontSize: "12px", margin: "0 0 12px" }}>{error}</p>}

              <button type="submit" style={{ width: "100%", background: "#e8825a", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "13px", border: "none", borderRadius: "8px", cursor: "pointer", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" }}>
                Create Account
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ flex: 1, height: "1px", background: "#f0ebe3" }} />
                <span style={{ fontSize: "12px", color: "#b5a898" }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "#f0ebe3" }} />
              </div>

              <button type="button" onClick={() => navigate("/login")} style={{ width: "100%", background: "transparent", color: "#0d1b2a", fontSize: "13px", fontWeight: 600, padding: "12px", border: "1.5px solid #e8e2d9", borderRadius: "8px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
                Already have an account? Login →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp