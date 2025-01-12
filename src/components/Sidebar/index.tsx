"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { navLink } from "../NavLink";

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
    <aside
      className={`${styles.sidebar} ${
        isSidebarOpen ? styles.open : styles.collapsed
      }`}
    >
      <div className={styles.header}>
        {isSidebarOpen && (
          <span className={styles.headerText}>Admin Panel</span>
        )}
        <button onClick={toggleSidebar} className={styles.toggleButton}>
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navLink.map((nav) => {
            const Icon = nav.icon;
            return (
              <li key={nav.name}>
                <Link
                  href={nav.pageUrl}
                  className={`${styles.navItem} ${getActiveClass(nav.pageUrl)}`}
                  onClick={() => {
                    setIsSidebarOpen(false);
                  }}
                >
                  {isSidebarOpen ? (
                    <>
                      <Icon />
                      {nav.name}
                    </>
                  ) : (
                    <div className={styles.collapsedIcon}>
                      <Icon />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
