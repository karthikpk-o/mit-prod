import React, { useState, useEffect } from 'react'
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { motion } from 'framer-motion'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export default function Component() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    // Prevent going back after login
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post(`https://mit-prod-q12j.vercel.app/api/v1/user/login`, {
        username,
        password
      });

      localStorage.setItem("token", response.data.token);
      //setnav
      if(response.data.Role == "R1"){
        navigate("/user/voucherentry");
      }else{
        navigate("/user/voucherapproval");
      }
      

    }catch(error){
      if(error.response && error.response.status === 411){
        alert(error.response.data.message);
      }else{
        console.error("Error during signin: ", error)
      }
    }
  } 

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 overflow-hidden">
      <motion.img
        src="/placeholder.svg?height=1080&width=1920"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      />
      
      <nav className="relative z-10 bg-white bg-opacity-90 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.h1 
              className="text-2xl font-bold text-indigo-700"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Finance Application
            </motion.h1>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <motion.div 
          className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-indigo-50 bg-opacity-50 px-6 py-4">
            <h2 className="text-2xl font-bold text-center text-indigo-700">Login</h2>
            <p className="text-center text-indigo-600 mt-1">Enter your credentials</p>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-indigo-600">
                Username
              </label>
              <input
                id="username"
                placeholder="Enter your username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-indigo-600">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-600 hover:text-indigo-800"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </motion.div>
      </main>

      
    </div>
  )
}