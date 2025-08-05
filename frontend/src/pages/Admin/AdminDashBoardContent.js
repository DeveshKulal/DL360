import React from 'react';
import { Users, Grid, AlertCircle, CheckCheck } from 'lucide-react';

export default function AdminDashBoardContent() {
  const cards = [
    {
      title: 'Registered Users',
      value: '24,562',
      icon: <Users className="w-6 h-6 text-red-500" />,
      bg: 'bg-blue-50',
    },
    {
      title: 'Total Vehicles',
      value: '18,945',
      icon: <Grid className="w-6 h-6 text-red-500" />,
      bg: 'bg-green-50',
    },
    {
      title: 'Open Complaints',
      value: '156',
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      bg: 'bg-yellow-50',
    },
    {
      title: 'Resolved Issues',
      value: '1,438',
      icon: <CheckCheck className="w-6 h-6 text-red-500" />,
      bg: 'bg-red-50',
    },
  ];

  return (
    <div className="bg-gray-100 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl w-full">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow-sm ${card.bg} p-4 flex justify-between items-center hover:shadow-md transition duration-200`}
          >
            <div>
              <p className="text-gray-600 text-sm mb-2">{card.title}</p>
              <h2 className="text-2xl font-semibold text-gray-900">{card.value}</h2>
            </div>
            {card.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
