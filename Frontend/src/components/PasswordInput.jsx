import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setisIsShowPassword] = useState(false)
  return (
    <div className='flex items-center bg-cyan-600/5 px-5 rounded-sm mb-3'>
        <input value={value} onChange={onChange} placeholder= {placeholder  ||
            "Enter Your Password"} className="w-full text-sm bg-transparent py-3 mr-3
             rounded-sm outline-hidden"
             type={isShowPassword ? "text" : "password"}
             />

            {isShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
  )
}

export default PasswordInput