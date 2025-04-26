"use client";

import React from "react";
import Link from "next/link";
import { FaHome, FaVideo, FaUser, FaEllipsisH, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const { signOut, isSignedIn } = useAuth(); 
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      alert("You have been logged out.");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-16 md:w-64 bg-black text-white flex flex-col items-center md:items-start md:space-y-6 py-4">
      <div className="flex items-center space-x-2 mb-6 md:px-4">
        <img src="/popreel-logo.png" alt="PopReel Logo" className="w-8 h-8" />
        <h1 className="hidden md:block text-xl font-bold text-white">PopReel</h1>
      </div>

      <div className="hidden md:flex items-center w-full px-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-900 text-white rounded-full py-2 px-4 text-sm outline-none placeholder-gray-500"
        />
      </div>
      <nav className="mt-6 w-full">
        <Link href="/feed" className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-800 rounded-lg">
          <FaHome className="text-xl text-red-500" />
          <span className="hidden md:block text-sm">Feed</span>
        </Link>
        <Link href="/upload" className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-800 rounded-lg">
          <FaVideo className="text-xl text-white" />
          <span className="hidden md:block text-sm">Upload</span>
        </Link>
        <Link href="/profile" className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-800 rounded-lg">
          <FaUser className="text-xl text-white" />
          <span className="hidden md:block text-sm">Profile</span>
        </Link>
        <Link href="/more" className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-800 rounded-lg">
          <FaEllipsisH className="text-xl text-white" />
          <span className="hidden md:block text-sm">More</span>
        </Link>

        {isSignedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 py-3 px-4 hover:bg-gray-800 rounded-lg w-full"
          >
            <FaSignOutAlt className="text-xl text-white" />
            <span className="hidden md:block text-sm">Logout</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
