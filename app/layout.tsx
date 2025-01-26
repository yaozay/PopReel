// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "PopReel",
  description: "Your TikTok clone built with Next.js & Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap entire app in ClerkProvider */}
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
