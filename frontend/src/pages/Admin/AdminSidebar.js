import { LayoutDashboard, Users, Car, FileWarning } from "lucide-react";
import Sidebar from "../../components/dashboard/Sidebar";


const adminSidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" , path:'dashboard'},
  { icon: Users, label: "Manage Users" , path:'users'},
  { icon: Car, label: "Manage Vehicles" , path: 'vehicles'},
  { icon: FileWarning, label: "View Complaints", path: 'complaints'},
];

const adminColorTheme = {
  bg: "bg-red-50",
  text: "text-red-600",
  btnBg: "bg-red-600"
};


export default function AdminSidebar() {
  return (
    <div className="flex">
      <Sidebar items={adminSidebarItems} colorTheme={adminColorTheme}/>
    </div>
  );
}
