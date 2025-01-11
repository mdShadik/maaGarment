"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { pageEndPoints } from "@/utils/constants/appConstants";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbScanEye } from "react-icons/tb";
import { BiSpreadsheet } from "react-icons/bi";
import { IoAnalyticsSharp } from "react-icons/io5";



const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getActiveClass = (path: string) => {
    return pathname === path ? styles.active : "";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : styles.collapsed}`}>
      <div className={styles.header}>
        {isSidebarOpen && <span className={styles.headerText}>Admin Panel</span>}
        <button onClick={toggleSidebar} className={styles.toggleButton}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href={pageEndPoints.dashboard} className={`${styles.navItem} ${getActiveClass(pageEndPoints.dashboard)}`}>
              {isSidebarOpen ? (
              <>
                <MdDashboard />
                Dashboard
              </>
                ) : <div className={styles.collapsedIcon}>
                  <MdDashboard />
                </div>}
  
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
