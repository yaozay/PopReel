"use client"; 
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <div className="flex min-h-screen">
            {!isHome && <Sidebar />}
            <main className="flex-grow">{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
