import { Lock, Menu } from "lucide-react";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ items = [], colorTheme = {} }) {  
  const [isOpen,setIsOpen] = useState(true)

  const [activeIndex,setActiveIndex] = useState( () => {
    const storedIndex = localStorage.getItem('sidebar-active-index');
    return storedIndex ? parseInt(storedIndex,10) : 0;
  });

  const handleClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem('sidebar-active-index',index.toString())
  }

  // Default color theme fallback
  const activeColor = {
    bg: colorTheme.bg || "bg-red-50",
    text: colorTheme.text || "text-red-600",
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        className="md:hidden p-3 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      <aside
        className={`h-screen bg-white shadow-sm border-r flex flex-col transition-all duration-300 z-50 
        fixed md:static top-0 left-0 
        ${isOpen ? "w-64" : "w-0  overflow-hidden"}
        md:w-64
        `}
      >
        <div className="text-2xl font-bold px-6 py-4 border-b bg-white">
          DL360
        </div>

        <nav className="flex-1 flex flex-col gap-2 p-4">
          {items.map((item, index) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={index === activeIndex}
              activeColor={activeColor}
              onClick={() => handleClick(index)}
              path={item.path}
            />
          ))}
        </nav>

        <div className="p-4">
          <div
            className={`${
              colorTheme.btnBg || "bg-red-600"
            } text-white flex items-center gap-3 px-6 py-3 cursor-pointer rounded-md font-semibold`}
          >
            <Lock className="w-5 h-5" />
            <span className="whitespace-nowrap">Change Password</span>
          </div>
        </div>
      </aside>
    </>
  );
}
