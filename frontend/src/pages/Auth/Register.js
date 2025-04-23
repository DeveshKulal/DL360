import React, { useState } from 'react'
import { EyeClosed,Eye, LockIcon, Mail, UserRound, User } from 'lucide-react'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    role:''
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData( (prev) => ({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.password || !formData.role) {
        setMessage("Please fill in all fields.");
        return;
      }
      const response = await axios.post(`http://localhost:3003/api/auth/register`,formData)
      setMessage(response.data.message)
      setTimeout(()=> navigate('/login'),1500);

      // console.log('Recieved message is :',message);
      // console.log('Register Data : ',response.data.message);

    } catch (error) {
      if(error.response && error.response.data.message){
        setMessage(error.response.data.message)
      }else{
        setMessage("An error occured during registration.")
      }
    }
    
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      {/* Left Side */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white px-6 py-12 flex items-center justify-center">
          <div className="p-6 sm:p-10 rounded-lg w-full max-w-md shadow-xl">
            <p className="font-bold text-center text-3xl sm:text-4xl pt-4 sm:pt-8 mb-4">DL360</p>
            <p className="text-gray-600 mb-4 text-center text-sm sm:text-base">Welcome! Please register here.</p>
            
            <div className='px-2 sm:px-4'>
              <div className="space-y-4">
                {/* Name */}
                <label className="input bg-white flex items-center gap-2 w-full border rounded px-3 py-2">
                  <User className="size-4 text-blue-700" />
                  <input
                    type="text"
                    className="grow outline-none text-sm"
                    placeholder="Name"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
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
                    type={showPassword? 'text':'password'}
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
                <label className="input bg-white flex items-center gap-2 w-full border rounded px-3 py-2">
                  <UserRound className="size-4 text-blue-700" />
                  <select 
                    className="grow bg-white outline-none text-sm"
                    name='role'
                    value={formData.role} 
                    onChange={handleChange} 
                  >
                    <option value='' disabled>Select role</option>
                    <option value='Admin'>Admin</option>
                    <option value='Staff'>Staff</option>
                    <option value='User'>User</option>
                  </select>
                </label>
                {message && <div className='text-sm text-red-600 font-medium'>{message}</div>}

                {/* Register Button */}
                <button 
                  className="btn btn-primary w-full py-2 text-sm sm:text-base"
                  type='submit'
                >
                  Register
                </button>
              </div>
            </div>

            <div className='flex justify-center items-center pt-6 text-sm'>
              <p>Already have an account? <Link to={'/login'} className='text-blue-700'>Login</Link></p>
            </div>
          </div>
        </div>
      </form>

      {/* Right Side */}
      <div className="hidden lg:flex items-center justify-center bg-black text-white p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join DL360 Today</h2>
          <p className="text-gray-300 max-w-sm">Start your journey with us. Experience smart management and seamless access!</p>
        </div>
      </div>
    </div>
  )
}

export default Register
