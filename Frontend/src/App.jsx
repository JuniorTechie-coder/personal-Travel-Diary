import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Map from "./pages/Map/Map"
import Explore from "./pages/Explore/Explore"
import UserProfile from "./pages/Explore/UserProfile"
import EditProfile from "./pages/Profile/EditProfile"
import Landing from "./pages/Landing/Landing"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/sign-up" exact element={<SignUp />} />
        <Route path="/map" element={<Map />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App