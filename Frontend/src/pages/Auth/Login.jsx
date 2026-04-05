import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import axiosInstance from '../../utils/axiosInstance'
import { validateEmail } from '../../utils/helper'
import { signInStart, signInSuccess, signInFailure } from '../../redux/slice/userSlice'
import PasswordInput from '../../components/PasswordInput'

const slides = [
  {
    image: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Beach Sunset",
    heading: "Golden hour\nnever gets old",
    para: "Chase the sun, feel the sand, and let every sunset remind you that beautiful endings lead to new beginnings.",
  },
  {
    image: "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "City Lights",
    heading: "Cities that\nnever sleep",
    para: "From rooftop bars to cobblestone alleys, every city has a thousand stories waiting to be told.",
  },
  {
    image: "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Mountain Life",
    heading: "Above the clouds,\nbelow the stars",
    para: "Where the air is crisp and the views are endless — some journeys take you higher than you imagined.",
  },
  {
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Hidden Gems",
    heading: "Lost roads lead\nto best places",
    para: "The most unforgettable destinations are the ones you never planned to find.",
  },
]

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCur(prev => (prev + 1) % slides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return }
    if (!password) { setError("Please enter your password."); return }
    setError("")
    dispatch(signInStart())
    try {
      const response = await axiosInstance.post("/auth/signin", { email, password })
      if (response.data) {
        dispatch(signInSuccess(response.data))
        navigate("/home")
      }
    } catch (err) {
      dispatch(signInFailure(err?.response?.data?.message || "Something went wrong."))
      setError(err?.response?.data?.message || "Something went wrong, please try again.")
    }
  }

  const slide = slides[cur]

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
          <button onClick={() => navigate("/sign-up")} style={{ background: "#e8825a", color: "#fff", border: "none", padding: "8px 22px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>Sign Up</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 48px" }}>
        <div style={{ display: "flex", width: "100%", maxWidth: "1000px", height: "580px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px #0d1b2a22" }}>

          {/* Left sliding panel */}
          <div style={{ flex: 1.3, position: "relative", overflow: "hidden" }}>
            {slides.map((s, i) => (
              <div key={i} style={{ position: "absolute", inset: 0, opacity: i === cur ? 1 : 0, transition: "opacity 1.4s ease" }}>
                <img src={s.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d1b2a33 0%, #0d1b2acc 100%)" }} />
              </div>
            ))}

            {/* Top logo on image */}
            <div style={{ position: "absolute", top: "28px", left: "28px", zIndex: 2 }}>
              <span style={{ fontFamily: "'Volkhov', serif", fontSize: "22px", fontWeight: 700 }}>
                <span style={{ color: "#fff" }}>Travel</span>
                <em style={{ fontStyle: "italic", color: "#c9a84c" }}>Diary</em>
              </span>
            </div>

            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "36px", zIndex: 2 }}>
              {/* Tag */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "24px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
                <span style={{ fontSize: "10px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>{slide.tag}</span>
              </div>

              <h1 style={{ fontFamily: "'Volkhov', serif", fontSize: "36px", fontWeight: 700, color: "#fff", margin: "0 0 12px", lineHeight: 1.2, whiteSpace: "pre-line" }}>
                {slide.heading}
              </h1>
              <p style={{ fontSize: "13px", fontWeight: 300, color: "#ffffffcc", margin: "0 0 24px", lineHeight: 1.7 }}>
                {slide.para}
              </p>

              {/* Dots */}
              <div style={{ display: "flex", gap: "8px" }}>
                {slides.map((_, i) => (
                  <div key={i} onClick={() => setCur(i)} style={{ height: "3px", borderRadius: "2px", background: i === cur ? "#c9a84c" : "#ffffff55", width: i === cur ? "32px" : "20px", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 44px" }}>

            {/* Header */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "28px", height: "2px", background: "#e8825a", borderRadius: "2px" }} />
                <span style={{ fontSize: "11px", color: "#e8825a", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>Welcome Back</span>
              </div>
              <h2 style={{ fontFamily: "'Volkhov', serif", color: "#0d1b2a", fontSize: "30px", fontWeight: 700, margin: "0 0 6px" }}>Sign in to your<br />journal</h2>
              <p style={{ color: "#b5a898", fontSize: "13px", margin: 0, lineHeight: 1.6 }}>Continue your travel story where you left off</p>
            </div>

            <form onSubmit={handleSubmit}>
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

              <button type="submit" style={{ width: "100%", background: "#0d1b2a", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "13px", border: "none", borderRadius: "8px", cursor: "pointer", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" }}>
                Sign In
              </button>

              <button type="submit" style={{ width: "100%", background: "#e8825a", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "13px", border: "none", borderRadius: "8px", cursor: "pointer", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
                Sign In with Google
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ flex: 1, height: "1px", background: "#f0ebe3" }} />
                <span style={{ fontSize: "12px", color: "#b5a898" }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "#f0ebe3" }} />
              </div>

              <button type="button" onClick={() => navigate("/sign-up")} style={{ width: "100%", background: "transparent", color: "#0d1b2a", fontSize: "13px", fontWeight: 600, padding: "12px", border: "1.5px solid #e8e2d9", borderRadius: "8px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
                Create an account →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login