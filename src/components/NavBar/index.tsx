"use client"; // Important: Make this client-side

import React from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"; // usePathname hook from next/navigation
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { pageEndPoints } from "@/utils/constants/appConstants";
import { clearToken } from "@/utils/localstorage";
import { getPageTitle } from "../NavLink";

const Navbar = () => {
  const params = useParams()
  const pathname = usePathname();
  // const query = router

  return (
    <header className={styles.navbar}>
      <div className={styles.headerLeft}>
        <h1>{getPageTitle(pathname, params)}</h1>
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
