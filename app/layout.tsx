// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import React from "react";
import NavBar from "@/components/NavBar"; // Import NavBar component

export const metadata = {
  title: "PopReel",
  description: "Your platform for sharing amazing content.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {/* Navigation Bar */}
          <NavBar />
          {/* Main Content */}
          <main>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
