"use client";

import React from "react";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/sign-in"); // Redirect to the sign-in page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to PopReel!</h1>
      <p className="text-gray-600 mb-6">
        Your platform for sharing and exploring amazing content.
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
