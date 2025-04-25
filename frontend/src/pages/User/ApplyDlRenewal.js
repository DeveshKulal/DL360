import React, { useEffect } from "react";
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

  useEffect( () => {
    const userData = JSON.parse(localStorage.getItem('userSession'));
    const userId = userData?.user?.id
    
    const fetchData = async (userId) => {
      try {
        if (userId) {
          const response = await axios.get('http://localhost:3003/api/user/apply-dl-renewal', { params: { user_id: userId } });
          const userInfo = response.data.user;
          localStorage.setItem('llrData', JSON.stringify(response.data.llr));
          localStorage.setItem('userInfo', JSON.stringify(response.data.user));

          // console.log('LLR Data:', response.data.llr);
          // console.log('User Data:', response.data.user);
          console.log(userInfo.name);
          console.log(userInfo.mobile_number);
          console.log(userInfo.date_of_birth);
          console.log(userInfo.street);
          console.log(userInfo.city);
          console.log(userInfo.state);          
        }
      } catch (err) {
        console.error('Error fetching DL renewal data:', err);
      }   
    };
    fetchData(userId)  
  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-xl">
        <div className="flex items-center gap-2 mb-4">
          <BadgeCheckIcon className="text-green-600" />
          <h1 className="text-xl font-semibold">DL Renewal Application</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">Please fill in the details below</p>

        {/* DL Number */}
        <form>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Driving License Number<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your DL number"
                className="input input-bordered w-full pl-10"
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
                className="input input-bordered w-full pl-10"
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
                className="input input-bordered w-full pl-10"
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
              <input type="date" className="input input-bordered w-full pl-10" />
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
                className="textarea textarea-bordered w-full pl-10"
                placeholder="Enter your complete address"
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
                <input type="date" className="input input-bordered w-full pl-10" />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Valid To<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input type="date" className="input input-bordered w-full pl-10" />
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
              <input type="text" className="input input-bordered w-full pl-10" value="450.00 " readOnly />
              <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Submit Button */}
          <button className="btn btn-success w-full text-white">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
