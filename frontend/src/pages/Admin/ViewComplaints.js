
import React from "react";
import { Check, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Resolved":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityStyle = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-orange-100 text-orange-800";
    case "Low":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ViewComplaints() {
  const [complaints, setComplaints] =  useState([
    {
      id: "",
      subject: "",
      user: "",
      role: "",
      status: "",
      priority: "",
      date: "",
    },  
  ]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const response = await axios.get(`http://localhost:3003/api/admin/get-complaints`);
        // console.log(response);
        
        setComplaints(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  const summary = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Complaints Management</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Total Complaints" count={summary.total} />
        <SummaryCard title="Pending" count={summary.pending} />
        <SummaryCard title="In Progress" count={summary.inProgress} />
        <SummaryCard title="Resolved" count={summary.resolved} />
      </div>

      {/* Complaints Table */}
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {complaints.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-700">{c.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{c.subject}</td>
                <td className="px-4 py-3 text-gray-700">
                  <div>{c.user}</div>
                  <div className="text-xs text-gray-500">{c.role}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityStyle(c.priority)}`}>
                    {c.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{c.date}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-green-600 hover:text-green-800">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({ title, count }) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{count}</div>
    </div>
  );
}

