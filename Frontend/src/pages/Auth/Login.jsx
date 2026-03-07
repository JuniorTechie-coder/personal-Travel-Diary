import React from 'react'
import PasswordInput from '../../components/PasswordInput'

const Login = () => {
  return (
    <div className="h-screen bg-cyan-50 
    overflow-hidden relative">
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-end bg-cover bg-center rounded-lg p-10 z-50 bg-[url('https://images.pexels.com/photos/2879841/pexels-photo-2879841.jpeg')]"> 
          <div>
             <h4 className="text-5xl text-white font-semibold leading-[58px]">
               Create Your <br /> Stories
             </h4>
            {/* If i want to change i can */}
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Record your travel experience and memories in your in your journey
             </p>
          </div> 
      </div>
        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 
        shadow-lg shadow-cyan-200">
          <form>
            <h4 className="text-2xl font-semibold mb-8">Login</h4>

            <input type="email" placeholder="Email" className="input-box" />

            <PasswordInput/>

            <button type="submit" className='btn-primary'>
              LOGIN
            </button>

            <p className="text-xs text-slate-500 text-center my-4">or</p>

            <button type="submit" className="btn-primary btn-light">
              CREATE ACCOUNT
            </button>
          </form>
        </div>
    </div>
    </div>
  )
}

export default Login