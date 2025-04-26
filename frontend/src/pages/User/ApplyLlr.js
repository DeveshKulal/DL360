import React from "react";
import {
  CalendarIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  LandmarkIcon,
  VenusAndMars,
} from "lucide-react";

export default function ApplyLlr() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <div className="bg-white rounded-2xl shadow p-8 max-w-3xl mx-auto  ">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </div>
        <form>
          {/* Full Name */}
          <div className="form-control mb-4">
            <p className="text-gray-700 mb-2 font-semibold text-sm">Full Name</p>
            <label className="input input-bordered flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-gray-400" />
              <input type="text" className="grow" placeholder="Enter your full name" />
            </label>
          </div>

          {/* Mobile Number and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <p className="text-gray-700 mb-2 font-semibold text-sm">Mobile Number</p> 
              <label className="input input-bordered flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-gray-400" />
                <input type="text" className="grow" placeholder="Enter mobile number" />
              </label>
            </div>
            <div className="form-control">
              <p className="text-gray-700 mb-2 font-semibold text-sm">Email Address</p>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <MailIcon className="w-4 h-4 text-gray-400" />
                <input type="email" className="grow" placeholder="Enter email address" />
              </label>
            </div>
          </div>

          {/* Date of Birth and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="form-control">
              <p className="text-gray-700 mb-2 font-semibold text-sm">Date of Birth</p>
              <label className="input input-bordered flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <input type="date" className="grow" />
              </label>
            </div>
            <div className="form-control">
              <p className="text-gray-700 mb-2 font-semibold text-sm">Gender</p>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <VenusAndMars className="size-4 text-gray-400" />
                <select className=" bg-white outline-none w-full">
                  <option disabled selected>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
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
                <input type="text" className="grow" placeholder="Enter street address" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <p className="text-gray-700 mb-2 font-semibold text-sm">City</p>
                <label className="input input-bordered flex items-center gap-2">
                  <LandmarkIcon className="w-4 h-4 text-gray-400" />
                  <input type="text" className="grow" placeholder="Enter city" />
                </label>
              </div>
              <div className="form-control">
                <p className="text-gray-700 mb-2 font-semibold text-sm">State</p>
                <select className="select select-bordered w-full">
                  <option disabled selected>Select state</option>
                  <option>Karnataka</option>
                  <option>Maharashtra</option>
                  <option>Kerala</option>
                </select>
              </div>
            </div>

            <div className="form-control mt-4">
              <p className="text-gray-700 mb-2 font-semibold text-sm">PIN Code</p>
              <input type="text" placeholder="Enter PIN code" className="input input-bordered w-full" />
            </div>
          </div>

          <div className="mt-6 text-right">
            <button className="btn btn-success text-white px-6">Apply for LLR</button>
          </div>
        </form>
      </div>
    </div>
  );
}
