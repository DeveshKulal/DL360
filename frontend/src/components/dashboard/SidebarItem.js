import React from 'react'
import { useNavigate } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, active, onClick, activeColor , path }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    onClick();
    navigate(path);
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 px-6 py-3 cursor-pointer rounded-md transition-all duration-300 ${
        active
          ? `${activeColor.bg} ${activeColor.text} font-semibold shadow-sm`
          : "text-gray-600 hover:bg-gray-100 hover:text-black font-semibold"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="whitespace-nowrap">{label}</span>
    </div>
)};
export default SidebarItem