import { LayoutDashboard, FileTextIcon, RotateCwIcon, ClipboardIcon } from "lucide-react";
import Sidebar from "../../components/dashboard/Sidebar";


const userSidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" ,path: 'dashboard'},
  { icon: FileTextIcon, label: "Apply LLR", path:'apply-llr' },
  { icon: RotateCwIcon, label: "Apply DL Renewal", path:'apply-dl-renewal' },
  { icon: ClipboardIcon, label: "View Emission Test", path:'view-emission-test' },
];

const userColorTheme = {
  bg: "bg-green-50",
  text: "text-green-600",
  btnBg: "bg-green-600",
};

export default function UserSidebar() {
  return (
    <div className="flex">
      <Sidebar items={userSidebarItems} colorTheme={userColorTheme} />
      {/* Main content here */}
    </div>
  );
}
