import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavLink from "@/lib/components/NavLink";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPEED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "w-dvw h-dvh"}>
        <div className="w-100 border-b border-neutral-400 shadow flex justify-between items-center">
          <div className="w-1/2 flex justify-start items-center px-2">
            <h1 className="text-xl font-bold py-4">SPEED</h1>
          </div>
          <div className="w-1/2 flex justify-end items-center px-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/search">Search</NavLink>
            <NavLink href="/submission">Submit New Entry</NavLink>
            <NavLink href="/login">Admin</NavLink>
          </div>
        </div>
        <div className="w-100 h-dvh">{children}</div>
      </body>
    </html>
  );
}
