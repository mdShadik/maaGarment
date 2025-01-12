import { pageEndPoints } from "@/utils/constants/appConstants";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { GrGroup } from "react-icons/gr";
import { store } from "@/store";
import { getGroupById } from "@/store/groupSlice";

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
  {
    name: "Group",
    pageUrl: pageEndPoints.groups,
    icon: GrGroup,
  },
];

export const getPageTitle = (pathname: string, params: any) => {
    const additionalRoutes = {
      [pageEndPoints.addGroups]: "Add Group",
      [pageEndPoints.viewGroups]: "View Group",
    };
  
    const matchedLink = navLink.find((link) => link.pageUrl === pathname);
  
    if (matchedLink) {
      return matchedLink.name;
    }
  
    return additionalRoutes[pathname] || "Dashboard";
  };
  
