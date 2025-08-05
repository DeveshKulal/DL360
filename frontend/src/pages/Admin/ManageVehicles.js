import React, { useState, useEffect } from "react";
import { Pencil, Trash2,  } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:3003";

const initialVehicles = [
  { id: '', number: "", owner: "", type: "", color:'', rfid_tag : '', emission: "" },
];

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`${API}/api/admin/get-vehicles`);
        // console.log(response);
        
        setVehicles(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handleEdit = (vehicle) => {
    setSelectedVehicle({ ...vehicle }); // clone to avoid direct mutation
    setShowModal(true);
  };

  const handleSave = () => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === selectedVehicle.id ? selectedVehicle : v))
    );
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Vehicles List</h1>
        {/* <button className="bg-red-600 text-white px-4 py-2 rounded flex items-center">
          <Plus className="h-4 w-4 mr-2" /> Add Vehicle
        </button> */}
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 font-semibold text-gray-700">
            <tr>
              <th className="px-6 py-4">Vehicle Number</th>
              <th className="px-6 py-4">Owner Name</th>
              <th className="px-6 py-4">Vehicle Type</th>
              <th className="px-6 py-4">Color</th>
              <th className="px-6 py-4">RFID</th>
              <th className="px-6 py-4">Emission Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.map((v) => (
              <tr key={v.id} className="border-t">
                <td className="px-6 py-4 text-red-600">{v.number}</td>
                <td className="px-6 py-4">{v.owner}</td>
                <td className="px-6 py-4">{v.type}</td>
                <td className="px-6 py-4">{v.color}</td>
                <td className="px-6 py-4">{v.rfid_tag}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      v.emission === "Low"
                        ? "bg-green-100 text-green-700"
                        : v.emission === "Moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {v.emission}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => handleEdit(v)} className="text-gray-600 hover:text-blue-600">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Vehicle</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Vehicle Number</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={selectedVehicle?.number}
                  onChange={(e) =>
                    setSelectedVehicle({ ...selectedVehicle, number: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Owner Name</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={selectedVehicle?.owner}
                  onChange={(e) =>
                    setSelectedVehicle({ ...selectedVehicle, owner: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Vehicle Type</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={selectedVehicle?.type}
                  onChange={(e) =>
                    setSelectedVehicle({ ...selectedVehicle, type: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Emission Status</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={selectedVehicle?.emission}
                  onChange={(e) =>
                    setSelectedVehicle({ ...selectedVehicle, emission: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
