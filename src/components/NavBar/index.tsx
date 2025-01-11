"use client"; // Important: Make this client-side

import React from "react";
import { usePathname } from "next/navigation"; // usePathname hook from next/navigation
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { pageEndPoints } from "@/utils/constants/appConstants";
import { clearToken } from "@/utils/localstorage";
import { navLink } from "../NavLink";

const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname

  const getActiveClass = (path: string) => {
    return pathname === path ? styles.active : ""; // Check if current pathname matches the link
  };

  const getPageTitle = () => {
    const matchedLink = navLink.find((link) => link.pageUrl === pathname);
  
    return matchedLink ? matchedLink.name : "Dashboard";
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.headerLeft}>
        <h1>{getPageTitle()}</h1>
      </div>
      <div className={styles.headerRight}>
        <span>Welcome User!</span>

        <CDropdown>
          <CDropdownToggle className={styles.dropdownToggle} caret={false}>
            <Image src="/vercel.svg" width={30} height={30} alt="investor-svg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              href={pageEndPoints.login}
              onClick={() => {
                clearToken();
              }}
              className={styles.logout}
              color="red"
            >
              Logout
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
    </header>
  );
};

export default Navbar;
