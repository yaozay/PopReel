import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import React from "react";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component

export const metadata = {
  title: "PopReel",
  description: "Your platform for sharing amazing content.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-grow">{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
