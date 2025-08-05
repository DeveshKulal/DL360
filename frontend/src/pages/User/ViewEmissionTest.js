import axios from "axios";
import React, { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

const API = process.env.REACT_APP_API_URL || "http://localhost:3003";

export default function ViewEmissionTest() {
  const [message, setMessage] = useState("");
  const [validUntil, setValidUntil] = useState(null);
  const [status, setStatus] = useState("info"); // info, success, warning

  useEffect(() => {
    const fetchLatestEmissionTest = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userSession"));
        const userId = userData?.user?.id;      

        const response = await axios.get(`${API}/api/user/get-emission-test/${userId}`);
        const latestTest = response.data;

        if (!latestTest || !latestTest.date) {
          setMessage("No emission test found. Please take an emission test.");
          setStatus("info");
          return;
        }

        const lastTestDate = new Date(latestTest.date);
        const nextDueDate = new Date(lastTestDate);
        nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
        setValidUntil(nextDueDate.toLocaleDateString("en-IN"));

        if (new Date() > nextDueDate) {
          setMessage("Your emission test has expired. Please take a new test.");
          setStatus("warning");
        } else {
          setMessage("Your emission test is valid.");
          setStatus("success");
        }
      } catch (error) {
        console.error("Error fetching emission test:", error);
        setMessage("Unable to fetch emission test data.");
        setStatus("warning");
      }
    };

    fetchLatestEmissionTest();
  }, []);

  const getStatusIcon = () => {
    if (status === "success") return <CheckCircle className="text-green-500 w-6 h-6 mr-2" />;
    if (status === "warning") return <AlertTriangle className="text-yellow-500 w-6 h-6 mr-2" />;
    return <Info className="text-blue-500 w-6 h-6 mr-2" />;
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full transition-transform hover:scale-105 duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🚗 Emission Test Status</h2>
        
        <div className="flex items-center justify-center mb-4">
          {getStatusIcon()}
          <p className="text-gray-700 font-medium text-lg">{message}</p>
        </div>

        {validUntil && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Valid Until</p>
            <p className="text-lg font-semibold text-green-700">{validUntil}</p>
          </div>
        )}
      </div>
    </div>
  );
}
