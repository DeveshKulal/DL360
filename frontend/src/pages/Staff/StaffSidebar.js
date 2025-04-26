import { LayoutDashboard, FileTextIcon, RotateCwIcon, ShieldCheckIcon, IdCardIcon } from "lucide-react";
import Sidebar from "../../components/dashboard/Sidebar";


const userSidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" , path:'dashboard' },
  { icon: FileTextIcon, label: "Add FIR" ,path:'add-fir'},
  { icon: ShieldCheckIcon, label: "Apply Emission Test" ,path:'apply-emission-test'},
  { icon: IdCardIcon, label: "Approve LLR" , path:'approve-llr'},
  { icon: RotateCwIcon, label: "Approve DL Renewal", path:'approve-dl-renewal' },

];

const userColorTheme = {
  bg: "bg-blue-50",
  text: "text-blue-600",
  btnBg: "bg-blue-600",
};

export default function StaffSidebar() {
  return (
    <div className="flex">
      <Sidebar items={userSidebarItems} colorTheme={userColorTheme} />
      {/* Main content here */}
    </div>
  );
}
