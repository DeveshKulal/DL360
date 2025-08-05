import React, { useEffect, useState } from "react";
import {
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  BadgeCheckIcon,
} from "lucide-react";
import axios from "axios";

export default function ApplyDlRenewal() {
  const [formData, setFormData] = useState({
    llr_no: "",
    fullName: "",
    phoneNumber: "",
    dob: "",
    address: "",
    valid_from : "",
    valid_to : "",
    variant: "",
  });

  const [message, setMessage] = useState()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userSession"));
    const userId = userData?.user?.id;

    const fetchData = async (userId) => {
      try {
        if (userId) {
          const response = await axios.get("http://localhost:3003/api/user/apply-dl-renewal", {
            params: { user_id: userId },
          });

          const userInfo = response.data.user;
          const llrData = response.data.llr;

          localStorage.setItem("llrData", JSON.stringify(llrData));
          localStorage.setItem("userInfo", JSON.stringify(userInfo));

          setFormData({
            llr_no: llrData?.llr_no || "",
            fullName: userInfo?.name || "",
            phoneNumber: userInfo?.mobile_number || "",
            dob: userInfo?.date_of_birth || "",
            address: `${userInfo?.street || ""}, ${userInfo?.city || ""}, ${userInfo?.state || ""}`,

          });
        }
      } catch (err) {
        console.error("Error fetching DL renewal data:", err);
      }
    };

    fetchData(userId);
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('http://localhost:3003/api/user/apply-dl-renewal',formData);
      setFormData({
        llr_no: "",
        fullName: "",
        phoneNumber: "",
        dob: "",
        address: "",
        valid_from : "",
        valid_to : "",
        variant: "",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <BadgeCheckIcon className="text-green-600" />
          <h1 className="text-xl font-semibold">DL Renewal Application</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">Please fill in the details below</p>

        {/* DL Renewal Form */}
        <form onSubmit={handleSubmit}>
          {/* LLR Number */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Learner's License Number<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your LLR number"
                className="input input-bordered w-full pl-10 text-gray-400"
                value={formData.llr_no}
                readOnly
              />
              <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Full Name (as per DL)<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full pl-10 text-gray-400"
                value={formData.fullName}
                readOnly
              />
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="+91 XXXXX-XXXXX"
                className="input input-bordered w-full pl-10 text-gray-400"
                value={formData.phoneNumber}
                readOnly
              />
              <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* DOB */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Date of Birth<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                className="input input-bordered w-full pl-10 text-gray-400"
                value={
                  formData.dob
                    ? new Date(formData.dob).toISOString().split('T')[0]
                    : ''
                }
                readOnly
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Current Address<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                className="textarea textarea-bordered w-full pl-10 text-gray-400"
                placeholder="Enter your complete address"
                value={formData.address}
                readOnly
              />
              <MapPinIcon className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            </div>
          </div>
          {/* Valid From & To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Valid From<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="date"
                  className="input input-bordered w-full pl-10"
                  value={formData.valid_from || ""}
                  onChange={(e) => setFormData({...formData, valid_from:e.target.value})}
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Valid To<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  className="input input-bordered w-full pl-10"
                  value={formData.valid_to || ""}
                  onChange={(e) => setFormData({...formData, valid_to:e.target.value})}
                  readOnly
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          </div> 

          {/* Renewal Fee */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Renewal Fee<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                value="450.00"
                readOnly
              />
              <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Variant Dropdown */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Vehicle Class (Variant)<span className="text-red-500">*</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.variant}
              onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
            >
              <option value="" disabled>Select a vehicle class</option>
              <option value="HMV">HMV - Heavy Motor Vehicle</option>
              <option value="LMV">LMV - Light Motor Vehicle</option>
              <option value="MCWG">MCWG - Motorcycle With Gear</option>
              <option value="MCWOG">MCWOG - Motorcycle Without Gear</option>
              <option value="MGV">MGV - Medium Goods Vehicle</option>
              <option value="TRV">TRV - Transport Vehicle</option>
              <option value="HPMV">HPMV - High-Powered Motor Vehicle</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Payment Status<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.paymentStatus}
              readOnly
            />
          </div>
          
          {message}

          {/* Submit Button */}
          <button className="btn btn-success w-full text-white" type="submit">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
