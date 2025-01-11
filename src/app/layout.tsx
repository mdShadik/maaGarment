"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/NavBar";
import styles from "./RootLayout.module.scss";
import { usePathname } from "next/navigation";
import { pageEndPoints } from "@/utils/constants/appConstants";

const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
  ssr: false,
});


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === pageEndPoints.login;
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ToastContainer />
          <Toaster position="top-right" reverseOrder={false} />
          {!isLoginPage ? (
            <div className={styles.adminLayout}>
            <Sidebar />
            <div className={styles.contentArea}>
              <Navbar />
              <main className={styles.mainContent}>{children}</main>
            </div>
          </div>
          ) : isLoginPage ? children 
            : <main className={styles.mainContent}>{children}</main>
          }
        </ReduxProvider>
      </body>
    </html>
  );
}
