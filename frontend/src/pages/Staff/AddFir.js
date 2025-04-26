import React, { useState } from "react";
import { Send } from "lucide-react";

export default function AddFIR() {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (e.g., API call)
    console.log("Submitting FIR:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add FIR</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          ["fir_no", "FIR No"],
          ["vehicle_number", "Vehicle Number"],
          ["chase_no", "Chassis No"],
          ["model", "Model"],
          ["brand", "Brand"],
          ["color", "Color"],
          ["varient", "Varient"],
          ["fuel_type", "Fuel Type"],
          ["owner_name", "Owner Name"],
          ["phone_no", "Phone No"],
          ["lost_place", "Lost Place"],
          ["status", "Status"],
          ["email", "Email"],
          ["police_email", "Police Email"]
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required={name !== "vehicle_number" && name !== "email" && name !== "police_email"}
            />
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Lost Date</label>
          <input
            type="datetime-local"
            name="lost_date"
            value={formData.lost_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <Send size={18} /> Submit FIR
          </button>
        </div>
      </form>
    </div>
  );
}
