import React from "react";
import { useState } from "react";
import {
  CalendarIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  LandmarkIcon,
  VenusAndMars,
} from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:3003";

export default function ApplyLlr() {

  const [llrform, setLlrForm] = useState({
    name:'',
    email:'',
    mobile_number:'',
    date_of_birth :'',
    gender:'',
    street:'',
    city:'',
    state:'',
    pin_code:''
  })
  const [message, setMessage] = useState()

  const handleChange = (e) => {
    const {name, value} = e.target
    setLlrForm((prevData) => ({
      ...prevData,
      [name]:value
    }))
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${API}/api/user/apply-llr`,llrform);
      setLlrForm({
        name:'',
        email:'',
        mobile_number:'',
        date_of_birth :'',
        gender:'',
        street:'',
        city:'',
        state:'',
        pin_code:''
      })
    } catch (error) {
      if(error.response && error.response.data.message){
        setMessage(error.response.data.message)
      }else{
        setMessage("An error occured during registration.")
      }
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <div className="bg-white rounded-2xl shadow p-8 max-w-3xl mx-auto  ">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-control mb-4">
            <p className="text-gray-700 mb-2 font-semibold text-sm">Full Name</p>
            <label className="input input-bordered flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                name="name"
                value={llrform.name}
                onChange={handleChange}
                className="grow" placeholder="Enter your full name" />
            </label>
          </div>

          {/* Mobile Number and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <p className="text-gray-700 mb-2 font-semibold text-sm">Mobile Number</p> 
              <label className="input input-bordered flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  name="mobile_number"
                  value={llrform.mobile_number}
                  onChange={handleChange}   
                  className="grow" placeholder="Enter mobile number" />
              </label>
            </div>
            <div className="form-control">
              <p className="text-gray-700 mb-2 font-semibold text-sm">Email Address</p>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <MailIcon className="w-4 h-4 text-gray-400" />
                <input 
                  type="email"
                  name="email"
                  value={llrform.email}
                  onChange={handleChange}
                  className="grow" 
                  placeholder="Enter email address" />
              </label>
            </div>
          </div>

          {/* Date of Birth and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-control">
              <p className="text-gray-700 mb-2 font-semibold text-sm">Date of Birth</p>
              <label className="input input-bordered flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <input 
                  type="date" 
                  name="date_of_birth"
                  value={llrform.date_of_birth}
                  onChange={handleChange}
                  className="grow" />
              </label>
            </div>
            <div className="form-control">
              <p className="text-gray-700 mb-2 font-semibold text-sm">Gender</p>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <VenusAndMars className="size-4 text-gray-400" />
                <select 
                  name="gender"
                  value={llrform.gender}
                  onChange={handleChange}
                  className=" bg-white outline-none w-full"
                >
                  <option value='' disabled>Select gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
              </label>
            </div>
          </div>

          {/* Present Address */}
          <div className="mt-6 border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Present Address</h3>
              <span className="text-xs text-gray-500">All fields are required</span>
            </div>

            <div className="form-control mb-4">
              <p className="text-gray-700 mb-2 font-semibold text-sm">Street Address</p>
              <label className="input input-bordered flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <input type="text" 
                  className="grow"
                  placeholder="Enter street address"
                  name="street"
                  value={llrform.street}  
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <p className="text-gray-700 mb-2 font-semibold text-sm">City</p>
                <label className="input input-bordered flex items-center gap-2">
                  <LandmarkIcon className="w-4 h-4 text-gray-400" />
                  <input 
                    type="text"
                    className="grow" 
                    placeholder="Enter city"
                    name="city"
                    value={llrform.city}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="form-control">
                <p className="text-gray-700 mb-2 font-semibold text-sm">State</p>
                <label className="input input-bordered flex items-center gap-2">
                  <LandmarkIcon className="w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    className="grow" 
                    placeholder="Enter State"
                    name="state"
                    value={llrform.state}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className="form-control mt-4">
              <p className="text-gray-700 mb-2 font-semibold text-sm">PIN Code</p>
              <input 
                type="text" 
                placeholder="Enter PIN code" 
                className="input input-bordered w-full" 
                name="pin_code"
                value={llrform.pin_code}  
                onChange={handleChange}
              />
            </div>
          </div>
          {message}
          <div className="mt-6 text-right">
            <button 
              type="submit"
              className="btn btn-success text-white px-6"
            >Apply for LLR</button>
          </div>
        </form>
      </div>
    </div>
  );
}
