import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BadgeCheck,
  CalendarDays,
  User,
  IdCard,
  MapPin,
  Mail
} from 'lucide-react';

const UserDashboardContent = () => {
  const [dlData, setDlData] = useState(null);

  useEffect(() => {
    const fetchDL = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userSession"));
        const userId = userData?.user?.id;

        const res = await axios.get(`http://localhost:3003/api/user/driving-license/${userId}`);
        setDlData(res.data);
      } catch (err) {
        console.error('Error fetching DL:', err);
      }
    };
    fetchDL();
  }, []);

  if (!dlData) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        {/* LEFT CARD */}
        <div className="flex p-10  bg-white rounded-3xl shadow-2xl relative overflow-hidden border border-blue-100">
          {/* Background gradients and blur effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-blue-100 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-purple-200 rounded-full blur-2xl opacity-20" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 text-blue-700 font-bold text-2xl">
              <IdCard className="w-7 h-7" />
              Driving License
            </div>

            <div className="space-y-4 text-sm sm:text-base text-gray-800">
              <InfoRow icon={<User className="text-blue-600 w-5 h-5" />} label="Name" value={dlData.name} />
              <InfoRow icon={<Mail className="text-purple-600 w-5 h-5" />} label="E-mail" value={dlData.email} />
              <InfoRow icon={<BadgeCheck className="text-green-600 w-5 h-5" />} label="DL Number" value={dlData.dl_no} />
              <InfoRow icon={<CalendarDays className="text-yellow-600 w-5 h-5" />} label="Issued On" value={new Date(dlData.issue_date).toLocaleDateString()} />
              <InfoRow icon={<CalendarDays className="text-red-600 w-5 h-5" />} label="Valid Till" value={new Date(dlData.expiry_date).toLocaleDateString()} />
              <div className="flex items-start gap-3">
                <MapPin className="text-pink-500 w-5 h-5 mt-1" />
                <div>
                  <div className="font-medium text-gray-600">Address:</div>
                  <div className="text-sm text-gray-800">
                    {dlData.street}, {dlData.city},<br />
                    {dlData.state} - {dlData.pin_code}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT INFO SECTION */}
        <div className="flex-1 bg-white rounded-3xl shadow-md p-10 border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">Driving License Guidelines</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-3 text-sm sm:text-base leading-relaxed">
            <li>Your Driving License (DL) is a legal permit to drive issued by the transport department.</li>
            <li>It contains important personal and vehicle-related identification data.</li>
            <li>Always carry your DL while driving to avoid legal penalties.</li>
            <li>The license is typically valid for 20 years or until the age of 50, whichever comes first.</li>
            <li>Renew your DL before the expiry date to continue driving legally.</li>
            <li>If your address or personal info changes, update your DL through the RTO.</li>
            <li>If lost, you can apply for a duplicate DL through your RTO with required documents.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start sm:items-center gap-3">
    {icon}
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
      <div className="font-medium text-gray-600 w-32">{label}:</div>
      <div className="text-gray-800">{value}</div>
    </div>
  </div>
);

export default UserDashboardContent;
