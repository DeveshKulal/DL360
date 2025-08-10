import React from "react";
import { FileText, Car, CreditCard, RotateCcw } from "lucide-react";

function StaffDashBoardContent() {
  const items = [
    {
      title: "Add FIR",
      description:
        "Create and log First Information Reports for traffic violations",
      icon: <FileText className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Emission Test",
      description:
        "Process and verify vehicle emission test applications",
      icon: <Car className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Learner's License",
      description:
        "Review and approve Learner’s License applications",
      icon: <CreditCard className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "License Renewal",
      description:
        "Process driving license renewal applications",
      icon: <RotateCcw className="w-6 h-6 text-blue-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col gap-3 border border-gray-100"
        >
          <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default StaffDashBoardContent;
