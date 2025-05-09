import axios from "axios";
import { useEffect,useState } from "react";


export default function ApproveLLRApplications() {
  const [applications, setApplications] = useState(
    [{
        id: "",
        name: "",
        llr_no: "",
        llr_issue_date: "",
        status:""
    }]
    // [
    // {
    //   id: 1,
    //   name: "John Anderson",
    //   llr_no: "LLR2024001",
    //   llr_issue_date: "Jan 15, 2024",
    //   status: "Pending",
    // },
   
    );
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3003/api/staff/llr-requests`);
            console.log('Page loaded');
            console.log(response.data);
            
            // Set the actual data received from backend
            setApplications(response.data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }, []);

  const handleApprove = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "Approved" } : app
      )
    );
  };

  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "Rejected" } : app
      )
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Approve LLR Applications
        </h1>
        <p className="text-gray-500 mb-6">
          Review and manage learner's license requests
        </p>

        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full table-auto">
            <thead className="text-gray-700 bg-gray-100">
              <tr>
                <th className="text-left py-3 px-6">Applicant Name</th>
                <th className="text-left py-3 px-6">LLR Number</th>
                <th className="text-left py-3 px-6">Date</th>
                <th className="text-left py-3 px-6">Status</th>
                <th className="text-left py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app.llr_no} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-4 px-6 font-medium text-gray-800">{app.name}</td>
                  <td className="py-4 px-6">{app.llr_no}</td>
                  <td className="py-4 px-6">{app.llr_issue_date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`py-1 px-3 rounded-full text-sm font-semibold ${getStatusStyle(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {app.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(app.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app.id)}
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
