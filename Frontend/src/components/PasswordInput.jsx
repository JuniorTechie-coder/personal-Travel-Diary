import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({value, onChange, placeholder, style}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
      setIsShowPassword(!isShowPassword)
    }

  return (
    <div style={{ display: "flex", alignItems: "center", background: "#0c1a2e", border: "0.5px solid #1a3050", borderRadius: "8px", padding: "0 16px", marginBottom: "16px", ...style }}>
        <input 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder || "Enter Your Password"} 
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#d4c9bb", fontSize: "14px", padding: "12px 0" }}
          type={isShowPassword ? "text" : "password"}
        />
        {isShowPassword ? (
          <FaRegEye size={18} style={{ color: "#4a6080", cursor: "pointer" }} onClick={toggleShowPassword} />
        ) : (
          <FaRegEyeSlash size={18} style={{ color: "#4a6080", cursor: "pointer" }} onClick={toggleShowPassword} />
        )}
    </div>
  )
}

export default PasswordInput