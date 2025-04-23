import { LayoutDashboard, FileTextIcon, RotateCwIcon, ShieldCheckIcon, IdCardIcon } from "lucide-react";
import Sidebar from "../../components/dashboard/Sidebar";


const userSidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: FileTextIcon, label: "Add FIR" },
  { icon: ShieldCheckIcon, label: "Apply Emission Test" },
  { icon: IdCardIcon, label: "View Emission Test" },
  { icon: RotateCwIcon, label: "Approve DL Renewal" },

];

const userColorTheme = {
  bg: "bg-blue-50",
  text: "text-blue-600",
  btnBg: "bg-blue-600",
};

export default function StaffDashboard() {
  return (
    <div className="flex">
      <Sidebar items={userSidebarItems} colorTheme={userColorTheme} />
      {/* Main content here */}
    </div>
  );
}
