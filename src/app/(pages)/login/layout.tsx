import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "../../globals.css";
import styles from "./LoginLayout.module.scss";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Investor-Login",
  description: "Login to the investor admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.mainContent}`}>
          <ToastContainer/>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <main className={styles.mainContent}>{children}</main>
      </body>
    </html>
  );
}
