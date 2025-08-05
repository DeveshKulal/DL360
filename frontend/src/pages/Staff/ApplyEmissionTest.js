import axios from 'axios';
import { Info } from 'lucide-react';
import { useState } from 'react';

export default function ApplyEmissionTest() {
  const [formData, setFormData] = useState({
    Vehicle_no:"",
    Date_of_Emission_test:""
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]:value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.Vehicle_no || !formData.Date_of_Emission_test) {
        setMessage('Vehicle number and emission test date are required');
        setMessageType('error')
        return; // prevent form submission if validation fails
      }
  
      const response = await axios.post(
        'http://localhost:3003/api/staff/apply-emission-test',
        formData
      );  
  
      setMessage(response.data.message);
      setFormData({
        Vehicle_no: "",
        Date_of_Emission_test: ""
      });
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className=" bg-gray-100 flex flex-col pt-20">
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-xl w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply Emission Test</h2>
          <p className="text-sm text-gray-500 mb-6">Fill in the vehicle and emission details below</p>
          <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-xl shadow-sm p-6 space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number <Info className="ml-1 w-4 h-4 text-gray-400" />
                </label>
                <input
                  name='Vehicle_no'
                  type="text"
                  value={formData.Vehicle_no}
                  onChange={handleChange}
                  placeholder="Enter vehicle number"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  Test Date <Info className="ml-1 w-4 h-4 text-gray-400" />
                </label>
                <div className="relative">
                  <input
                    name='Date_of_Emission_test'
                    type="date"
                    value={formData.Date_of_Emission_test}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"

                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
            >
              Apply Emission Test
            </button>
              {message && (
                <div className={`mt-2 text-sm ${messageType === 'success'? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}

          </form>
        </div>
      </main>
    </div>
  );
}
