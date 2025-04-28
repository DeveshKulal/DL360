import { useState } from "react";

export default function LostVehicleForm() {
  const [formData, setFormData] = useState({
    fir_no: "",
    vehicle_number: "",
    chase_no: "",
    model: "",
    brand: "",
    color: "",
    varient: "",
    fuel_type: "",
    owner_name: "",
    phone_no: "",
    lost_place: "",
    lost_date: "",
    status: "",
    email: "",
    police_email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // here you can send formData to backend
    // axios.post('/api/lost-vehicle', formData)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add FIR</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* First Column */}
          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">FIR No</label>
            <input
              type="text"
              name="fir_no"
              value={formData.fir_no}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Vehicle Number</label>
            <input
              type="text"
              name="vehicle_number"
              value={formData.vehicle_number}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Chase No</label>
            <input
              type="text"
              name="chase_no"
              value={formData.chase_no}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Varient</label>
            <input
              type="text"
              name="varient"
              value={formData.varient}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Fuel Type</label>
            <input
              type="text"
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Owner Name</label>
            <input
              type="text"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Phone No</label>
            <input
              type="text"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Lost Place</label>
            <input
              type="text"
              name="lost_place"
              value={formData.lost_place}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Lost Date</label>
            <input
              type="date"
              name="lost_date"
              value={formData.lost_date}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Recovered">Recovered</option>
              <option value="Not Found">Not Found</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Owner Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-md font-semibold mb-2 text-gray-700">Police Email</label>
            <input
              type="email"
              name="police_email"
              value={formData.police_email}
              onChange={handleChange}
              className="input"
            />
          </div>

        </form>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-1/2"
          >
            Submit Report
          </button>
        </div>

      </div>
    </div>
  );
}
