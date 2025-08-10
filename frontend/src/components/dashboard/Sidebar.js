import { Lock, SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ items = [], colorTheme = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => {
    const storedIndex = localStorage.getItem("sidebar-active-index");
    return storedIndex ? parseInt(storedIndex, 10) : 0;
  });

  // Handle responsiveness & body scroll lock
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Always open on desktop
        document.body.style.overflow = ""; // Unlock scroll
      } else {
        setIsOpen(false); // Closed by default on mobile
        document.body.style.overflow = ""; // Unlock scroll
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when drawer open on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
  }, [isOpen]);

  const handleClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem("sidebar-active-index", index.toString());
  };

  // Default color theme fallback
  const activeColor = {
    bg: colorTheme.bg || "bg-red-50",
    text: colorTheme.text || "text-red-600",
  };

  return (
    <>
      {/* Toggle button for mobile */}
      {
        isOpen? 
        <button
          className=" flex md:hidden px-2 focus:outline-none z-50 fixed top-4 left-4  space-x-20"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div
            className={`text-xl font-bold px-6 `}
          >
            DL360
          </div>
          <SidebarCloseIcon className="w-6 h-6 text-gray-700" />
        </button>
        :
        <button
          className="md:hidden pt-1 px-2 focus:outline-none z-50 fixed top-4 left-4 "
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <SidebarOpenIcon className="w-6 h-6 text-gray-700" />
        </button>
      }
      {/* Sidebar */}
      <aside
        className={`
          h-screen bg-white shadow-sm border-r flex flex-col
          fixed md:static top-0 left-0 z-40
          transition-[width] duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0 md:w-64"}
        `}
      >
        <div className="pt-14">
          {/* Nav Items */}
          <nav
            className={`flex-1 flex flex-col gap-2 p-4 
              ${isOpen || window.innerWidth >= 768 ? "opacity-100" : "opacity-0"} 
              transition-opacity duration-300`}
          >
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
        </div>

        {/* Footer Button */}
        <div
          className={`p-4 
            ${isOpen || window.innerWidth >= 768 ? "opacity-100" : "opacity-0"} 
            transition-opacity duration-300`}
        >
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
