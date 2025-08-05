import axios from "axios";
import { useState, useEffect } from "react";

export default function LostVehicleForm() {
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    const newErrors = {};
  
    if (!formData.fir_no.trim()) newErrors.fir_no = "FIR number is required.";
    if (!formData.vehicle_number.trim()) newErrors.vehicle_number = "Vehicle number is required.";
    if (!formData.chase_no.trim()) newErrors.chase_no = "Chassis number is required.";
    if (!formData.model.trim()) newErrors.model = "Model is required.";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required.";
    if (!formData.color.trim()) newErrors.color = "Color is required.";
    if (!formData.varient.trim()) newErrors.varient = "Variant is required.";
    if (!formData.fuel_type.trim()) newErrors.fuel_type = "Fuel type is required.";
    if (!formData.owner_name.trim()) newErrors.owner_name = "Owner name is required.";
  
    if (!formData.phone_no.match(/^\d{10}$/)) newErrors.phone_no = "Valid 10-digit phone number is required.";
  
    if (!formData.lost_place.trim()) newErrors.lost_place = "Lost place is required.";
    if (!formData.lost_date.trim()) newErrors.lost_date = "Lost date is required.";
    if (!formData.status.trim()) newErrors.status = "Status is required.";
  
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Valid email is required.";
    if (!formData.police_email.match(/^\S+@\S+\.\S+$/)) newErrors.police_email = "Valid police email is required.";
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };

 
  
  useEffect(() => {
    const fetchFirNo = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/staff/get-fir-no');
        // console.log(response);
        
        const generatedFirNo = response.data.fir_no;
        setFormData(prev => ({ ...prev, fir_no: generatedFirNo }));
      } catch (error) {
        console.error('Error fetching FIR number:', error);
      }
    };

    fetchFirNo();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      // Proceed with form submission (e.g., API call)
      const response = axios.post(`http://localhost:3003/api/staff/add-fir`,formData)
      setFormData({
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
      })
    } else {
      console.log("Form has errors. Fix them before submitting.");
    }
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
              className="input input-bordered"
              readOnly
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
            {errors.vehicle_number && <span style={{ color: "red" }}>{errors.vehicle_number}</span>}
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
            {errors.chase_no && <span style={{ color: "red" }}>{errors.chase_no}</span>}
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
            {errors.model && <span style={{ color: "red" }}>{errors.model}</span>}
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
            {errors.brand && <span style={{ color: "red" }}>{errors.brand}</span>}

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
            {errors.color && <span style={{ color: "red" }}>{errors.color}</span>}
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
            {errors.varient && <span style={{ color: "red" }}>{errors.varient}</span>}
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
            {errors.fuel_type && <span style={{ color: "red" }}>{errors.fuel_type}</span>}
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
            {errors.owner_name && <span style={{ color: "red" }}>{errors.owner_name}</span>}
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
            {errors.phone_no && <span style={{ color: "red" }}>{errors.phone_no}</span>}
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
            {errors.lost_place && <span style={{ color: "red" }}>{errors.lost_place}</span>}
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
            {errors.lost_date && <span style={{ color: "red" }}>{errors.lost_date}</span>}
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
            {errors.status && <span style={{ color: "red" }}>{errors.status}</span>}
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
            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

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
            {errors.police_email && <span style={{ color: "red" }}>{errors.police_email}</span>}
            
          </div>

        </form>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary w-1/2"
          >
            Submit Report
          </button>
        </div>

      </div>
    </div>
  );
}
