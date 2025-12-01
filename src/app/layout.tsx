// "use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import ThemeProvider from "@/common/components/ThemeProvider";
import ThemeRegistry from "./theme-registert";
import Navbar from "@/common/components/Navbar";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Modern Dashboard - Next.js",
  description: "A feature-rich dashboard built with Next.js, MUI, Zustand, and Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

// const path=usePathname();



  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry >
          
          
          {children}
          
          </ThemeRegistry>
      </body>
    </html>
  );
}
