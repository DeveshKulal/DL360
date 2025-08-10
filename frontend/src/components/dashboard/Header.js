// components/Header.jsx
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-16 py-4 bg-white shadow-sm">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-end  ">
        <Bell className="text-gray-600" />
      </div>
    </div>
  );
};

export default Header;
