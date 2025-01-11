import { pageEndPoints } from "@/utils/constants/appConstants";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";

export const navLink = [
  {
    name: "Dashboard",
    pageUrl: pageEndPoints.dashboard,
    icon: MdDashboard,
  },

  {
    name: "Users",
    pageUrl: pageEndPoints.users,
    icon: HiUsers,
  },
];
