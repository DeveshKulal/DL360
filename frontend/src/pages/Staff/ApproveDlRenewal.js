import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import axios from "axios";

export default function ApproveDLRenewal() {
  const [requests, setRequests] = useState([
    {
      dl_no: "",
      name: "",
      valid_to: "",
      valid_from: "",
      status: "",
    },
    
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/staff/dl-requests`);
        console.log('Page loaded');
        console.log(response.data);
      

        const formattedData = response.data.map(req => ({
          ...req,
          valid_from: new Date(req.valid_from).toLocaleDateString(), 
          valid_to: new Date(req.valid_to).toLocaleDateString(),
        }));
        setRequests(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  
  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Approve DL Renewal
        </h2>
        <p className="text-gray-500 mb-6">
          Manage driving license renewal requests
        </p>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left py-3 px-6">Applicant Name</th>
                <th className="text-left py-3 px-6">Driving License</th>
                <th className="text-left py-3 px-6">Expiry Date</th>
                <th className="text-left py-3 px-6">Renewal Date</th>
                <th className="text-left py-3 px-6">Status</th>
                <th className="text-left py-3 px-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request, index) => (
                <tr
                  key={request.dl_no}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-4 px-6">{request.name}</td>
                  <td className="py-4 px-6">{request.dl_no}</td>
                  <td className="py-4 px-6 text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    {request.valid_to}
                  </td>
                  <td className="py-4 px-6">{request.valid_from}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`py-1 px-3 rounded-full text-sm font-semibold ${getBadgeStyle(
                        request.status
                      )}`}
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {request.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="border border-red-600 text-red-600 hover:bg-red-50 px-4 py-1 rounded-md text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
