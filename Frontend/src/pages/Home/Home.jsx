import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { ToastContainer, toast } from "react-toastify"
import { IoMdAdd } from "react-icons/io"
import Modal from "react-modal"
import AddEditTravelStory from "../../components/AddEditTravelStory"
import ViewTravelStory from "./ViewTravelStory"
import EmptyCard from "../../components/EmptyCard"
import { DayPicker } from "react-day-picker"
import moment from "moment"
import FilterInfoTitle from "../../components/FilterInfoTitle"
import { getEmptyCardMessage, getInitials } from "../../utils/helper"

const Home = () => {
  const [allStories, setAllStories] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("")
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [activeTab, setActiveTab] = useState("all")
  const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null })
  const [openViewModal, setOpenViewModal] = useState({ isShown: false, data: null })
  const navigate = useNavigate()

  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/travel-story/get-all")
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories)
      }
    } catch (error) {
      console.log("Something went wrong.")
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/get-user")
      if (response.data) setUserInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (data) => setOpenAddEditModal({ isShown: true, type: "edit", data })
  const handleViewStory = (data) => setOpenViewModal({ isShown: true, data })

  const updateIsFavourite = async (storyData) => {
    try {
      const response = await axiosInstance.put("/travel-story/update-is-favourite/" + storyData._id, { isFavorite: !storyData.isFavorite })
      if (response.data && response.data.story) {
        toast.success("Story updated!")
        getAllTravelStories()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTravelStory = async (data) => {
    try {
      const response = await axiosInstance.delete("/travel-story/delete-story/" + data._id)
      if (response.data && !response.data.error) {
        toast.success("Story deleted!")
        setOpenViewModal((prev) => ({ ...prev, isShown: false }))
        getAllTravelStories()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/travel-story/search", { params: { query } })
      if (response.data && response.data.stories) {
        setFilterType("search")
        setAllStories(response.data.stories)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearSearch = () => {
    setFilterType("")
    getAllTravelStories()
  }

  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null
      const endDate = day.to ? moment(day.to).valueOf() : null
      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-story/filter", { params: { startDate, endDate } })
        if (response.data && response.data.stories) {
          setFilterType("date")
          setAllStories(response.data.stories)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDayClick = (day) => {
    setDateRange(day)
    filterStoriesByDate(day)
  }

  const resetFilter = () => {
    setDateRange({ from: null, to: null })
    setFilterType("")
    getAllTravelStories()
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout")
    } catch (error) {
      console.log(error)
    }
    navigate("/login")
  }

  useEffect(() => {
    getAllTravelStories()
    getUserInfo()
  }, [])

  const filteredStories = allStories.filter(s => {
    if (activeTab === "favourites") return s.isFavorite
    if (activeTab === "public") return s.isPublic
    if (activeTab === "private") return !s.isPublic
    return true
  })

  const badgeColors = ["#e8825a", "#c9a84c", "#5a9e97", "#0d1b2a", "#8b5e3c"]

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Volkhov:ital,wght@0,400;0,700;1,700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: "'Poppins', sans-serif", background: "#faf7f2", height: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Navbar */}
        <div style={{ background: "#0d1b2a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: "62px", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Volkhov', serif", fontSize: "22px", fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("/")}>
            <span style={{ color: "#fff" }}>Travel</span>
            <em style={{ fontStyle: "italic", color: "#c9a84c" }}>Diary</em>
          </span>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", background: "#1a2d42", border: "1px solid #243d57", borderRadius: "8px", padding: "8px 14px", gap: "8px", width: "280px" }}>
            <span style={{ color: "#4a6580", fontSize: "14px" }}>⌕</span>
            <input
              placeholder="Search stories..."
              onChange={(e) => { if (e.target.value) { onSearchStory(e.target.value) } else { handleClearSearch() } }}
              style={{ background: "transparent", border: "none", outline: "none", fontSize: "13px", color: "#a0b4c8", width: "100%", fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <button onClick={() => navigate("/map")} style={{ fontSize: "12px", color: "#a0b4c8", padding: "7px 12px", borderRadius: "6px", cursor: "pointer", border: "none", background: "transparent", fontFamily: "'Poppins', sans-serif" }}>🗺️ Map</button>
            <button onClick={() => navigate("/explore")} style={{ fontSize: "12px", color: "#a0b4c8", padding: "7px 12px", borderRadius: "6px", cursor: "pointer", border: "none", background: "transparent", fontFamily: "'Poppins', sans-serif" }}>🌍 Explore</button>
            <button onClick={() => navigate("/edit-profile")} style={{ fontSize: "12px", color: "#a0b4c8", padding: "7px 12px", borderRadius: "6px", cursor: "pointer", border: "none", background: "transparent", fontFamily: "'Poppins', sans-serif" }}>✏️ Profile</button>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#0d1b2a", marginLeft: "6px" }}>
              {userInfo ? getInitials(userInfo.username) : "?"}
            </div>
            <button onClick={handleLogout} style={{ fontSize: "12px", color: "#0d1b2a", background: "#c9a84c", border: "none", padding: "7px 16px", borderRadius: "6px", cursor: "pointer", fontFamily: "'Poppins', sans-serif", fontWeight: 600, marginLeft: "4px" }}>Logout</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Sidebar */}
          <div style={{ width: "220px", background: "#fff", borderRight: "1px solid #e8e2d9", padding: "24px 14px", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" }}>

            <div style={{ fontSize: "10px", color: "#b5a898", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, padding: "0 8px", marginBottom: "8px" }}>My Journal</div>

            {[
              { id: "all", icon: "📖", label: "All Stories", count: allStories.length },
              { id: "favourites", icon: "♥", label: "Favourites", count: allStories.filter(s => s.isFavorite).length },
              { id: "public", icon: "🌍", label: "Public", count: allStories.filter(s => s.isPublic).length },
              { id: "private", icon: "🔒", label: "Private", count: allStories.filter(s => !s.isPublic).length },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", color: activeTab === item.id ? "#c9a84c" : "#6b5e52", fontWeight: activeTab === item.id ? 600 : 500, background: activeTab === item.id ? "#fdf8ec" : "transparent", borderLeft: activeTab === item.id ? "3px solid #c9a84c" : "3px solid transparent" }}
              >
                <span>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                <span style={{ background: activeTab === item.id ? "#c9a84c22" : "#f5f0e8", color: activeTab === item.id ? "#c9a84c" : "#8b7355", fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "10px" }}>{item.count}</span>
              </div>
            ))}

            <div style={{ fontSize: "10px", color: "#b5a898", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, padding: "0 8px", marginTop: "16px", marginBottom: "8px" }}>Explore</div>

            {[
              { icon: "👥", label: "Travelers", path: "/explore" },
              { icon: "📍", label: "Map View", path: "/map" },
            ].map((item, i) => (
              <div key={i} onClick={() => navigate(item.path)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", color: "#6b5e52", fontWeight: 500 }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#faf7f2"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}

            <div style={{ fontSize: "10px", color: "#b5a898", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, padding: "0 8px", marginTop: "16px", marginBottom: "8px" }}>Account</div>
            <div onClick={() => navigate("/edit-profile")} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", color: "#6b5e52", fontWeight: 500 }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#faf7f2"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span>👤</span><span>Edit Profile</span>
            </div>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px", background: "#faf7f2" }}>
            <FilterInfoTitle filterType={filterType} filterDate={dateRange} onClear={resetFilter} />

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "24px" }}>
              <div>
                <div style={{ fontFamily: "'Volkhov', serif", fontSize: "26px", color: "#0d1b2a", fontWeight: 700 }}>Your Journeys</div>
                <div style={{ fontSize: "12px", color: "#b5a898", marginTop: "3px" }}>{filteredStories.length} stories · {allStories.filter(s => s.coordinates?.lat).length} locations pinned</div>
              </div>
              <button
                onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
                style={{ display: "flex", alignItems: "center", gap: "6px", background: "#c9a84c", color: "#0d1b2a", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}
              >
                <IoMdAdd size={18} /> Add Story
              </button>
            </div>

            {filteredStories.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {filteredStories.map((item, index) => (
                  <div
                    key={item._id}
                    onClick={() => handleViewStory(item)}
                    style={{ background: "#fff", border: "1px solid #e8e2d9", borderRadius: "14px", overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c9a84c" }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e2d9" }}
                  >
                    <div style={{ position: "relative" }}>
                      <img src={item.imageUrl} alt="" style={{ width: "100%", height: "155px", objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, #0d1b2a99 100%)" }} />
                      <div style={{ position: "absolute", top: "10px", left: "10px", background: badgeColors[index % badgeColors.length] + "ee", color: index % badgeColors.length === 1 ? "#0d1b2a" : "#fff", fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", padding: "3px 9px", borderRadius: "4px", fontWeight: 700 }}>
                        {item.visitedLocation?.[0] || "Journey"}
                      </div>
                      {item.isFavorite && (
                        <div style={{ position: "absolute", top: "10px", right: "10px", width: "28px", height: "28px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#e05252" }}>♥</div>
                      )}
                      <div style={{ position: "absolute", bottom: "10px", right: "10px", fontSize: "10px", color: "#ffffffbb", fontWeight: 500 }}>
                        {moment(item.visitedDate).format("DD MMM YYYY")}
                      </div>
                    </div>
                    <div style={{ padding: "14px" }}>
                      <div style={{ fontFamily: "'Volkhov', serif", fontSize: "15px", color: "#0d1b2a", fontWeight: 700, marginBottom: "6px", lineHeight: 1.3 }}>{item.title}</div>
                      <div style={{ fontSize: "11px", color: "#b5a898", lineHeight: 1.6, marginBottom: "10px" }}>{item.story?.substring(0, 70)}...</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f0ebe3", paddingTop: "10px" }}>
                        <div style={{ fontSize: "11px", color: "#6b5e52", fontWeight: 500 }}>
                          {item.visitedLocation?.length > 0 ? `📍 ${item.visitedLocation[0]}` : "📍 No location"}
                        </div>
                        <div style={{ fontSize: "11px", color: "#c9a84c", fontWeight: 700 }}>Read →</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc="https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&w=600"
                message={getEmptyCardMessage(filterType)}
                setOpenAddEditModal={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
              />
            )}
          </div>

          {/* Right panel */}
          <div style={{ width: "240px", background: "#fff", borderLeft: "1px solid #e8e2d9", padding: "24px 16px", overflowY: "auto" }}>

            <div style={{ fontSize: "10px", color: "#b5a898", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Quick Stats</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
              {[
                { num: allStories.length, label: "Stories" },
                { num: allStories.filter(s => s.coordinates?.lat).length, label: "Pinned" },
                { num: allStories.filter(s => s.isPublic).length, label: "Public" },
                { num: allStories.filter(s => s.isFavorite).length, label: "Favs" },
              ].map((stat, i) => (
                <div key={i} style={{ background: "#faf7f2", borderRadius: "10px", padding: "12px 10px", textAlign: "center", border: "1px solid #e8e2d9" }}>
                  <div style={{ fontFamily: "'Volkhov', serif", fontSize: "22px", color: "#0d1b2a", fontWeight: 700 }}>{stat.num}</div>
                  <div style={{ fontSize: "9px", color: "#b5a898", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: "10px", color: "#b5a898", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Map View</div>
            <div
              onClick={() => navigate("/map")}
              style={{ background: "#fdf8ec", border: "1px solid #e8d99a", borderRadius: "10px", height: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "20px", cursor: "pointer" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "#c9a84c"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e8d99a"}
            >
              <span style={{ fontSize: "24px" }}>🗺️</span>
              <div style={{ fontSize: "11px", color: "#b5a898" }}>{allStories.filter(s => s.coordinates?.lat).length} locations pinned</div>
              <div style={{ fontSize: "11px", color: "#c9a84c", fontWeight: 700 }}>Open Full Map →</div>
            </div>

            <div style={{ fontSize: "10px", color: "#b5a898", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Filter by Date</div>
            <DayPicker
              captionLayout="dropdown"
              mode="range"
              selected={dateRange}
              onSelect={handleDayClick}
              pagedNavigation
            />
          </div>
        </div>
      </div>

      {/* Add & Edit Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <AddEditTravelStory
          storyInfo={openAddEditModal.data}
          type={openAddEditModal.type}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 } }}
        appElement={document.getElementById("root")}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => setOpenViewModal((prev) => ({ ...prev, isShown: false }))}
          onEditClick={() => { setOpenViewModal((prev) => ({ ...prev, isShown: false })); handleEdit(openViewModal.data) }}
          onDeleteClick={() => deleteTravelStory(openViewModal.data)}
        />
      </Modal>

      <ToastContainer />
    </>
  )
}

export default Home