import React, { useState } from 'react'
import { Eye, EyeClosed, LockIcon, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email:'',
    password:'',
    // role:'User'
  })
  const [error , setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password ) {
        setError("Please fill in all fields.");
        return;
      }

      const response = await axios.post(`http://localhost:3003/api/auth/login`,formData);      
      const {role} = response.data.user

      // console.log("Login Response:", response.data);
      // console.log('Role is:',role);
      

      localStorage.setItem('userSession', JSON.stringify(response.data))
      if(role === 'Admin'){
        navigate('/admin')
      }else if(role === "Staff"){
        navigate("/Staff")
      }else if(role === "User"){
        navigate("/User")
      }else {
        setError("Invalid user role.");
        return;
      }
      setFormData({
        email:'',
        password:'',
        // role:''
      })
      setError('')
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while logging in");
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side */}
      <form onSubmit={handleLogin}>
        <div className="bg-white px-6 py-12 flex items-center justify-center">
          <div className="p-6 sm:p-10 rounded-lg w-full max-w-md shadow-xl">
            <p className="font-bold text-center text-3xl sm:text-4xl pt-4 sm:pt-8 mb-4">DL360</p>
            <p className="text-gray-600 mb-4 text-center text-sm sm:text-base">Welcome back! Please login to your account.</p>
            
            <div className='px-2 sm:px-4'>
              <div className="space-y-4">
                {/* Email */}
                <label className="input bg-white flex items-center gap-2 w-full border rounded px-3 py-2">
                  <Mail className="size-4 text-blue-700" />
                  <input
                    type="text"
                    className="grow outline-none text-sm"
                    placeholder="Email or Username"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>

                {/* Password */}
                <label className="input bg-white flex items-center gap-2 w-full border rounded px-3 py-2">
                  <LockIcon className="size-4 text-blue-700" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="grow outline-none text-sm"
                    placeholder="Enter password"
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button 
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    onClick={ () => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (<EyeClosed className='size-5 text-base-content/40 '/>) : (<Eye className='size-5 text-base-content'/>)}
                  </button>
                </label>

                {/* Role Selection */}
                {/* <label className="input bg-white flex items-center gap-2 w-full border rounded px-3 py-2">
                  <UserRound className="size-4 text-blue-700" />
                    <select
                      className="grow bg-white outline-none text-sm"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="User">User</option>
                    </select>
                </label> */}
                {error && <div className='text-sm text-red-600 font-medium'>{error}</div>}

                {/* Login Button */}
                <button
                  className="btn btn-primary w-full py-2 text-sm sm:text-base"
                  type='submit'
                >
                  Login
                </button>
            </div>
          </div>

            <div className='flex justify-center items-center pt-6 text-sm'>
              <p>Don't have an account? <Link to={'/register'} className='text-blue-700'>Register</Link> here!</p>
            </div>
          </div>
        </div>
      </form>

      {/* Right Side */}
      <div className="hidden lg:flex items-center justify-center bg-black text-white p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to DL360</h2>
          <p className="text-gray-300 max-w-sm">Streamline your workflow, manage users, and get the best experience with our platform.</p>
        </div>
      </div>
    </div>
  )
}

export default Login
