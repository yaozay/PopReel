"use client";

import React from "react";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/sign-in"); // Redirect to the sign-in page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome to PopReel!
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Your platform for sharing and exploring amazing content.
        </p>
      </div>

      {/* Call-to-Action Button */}
      <button
        onClick={handleGetStarted}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
