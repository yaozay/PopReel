"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/sign-in");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black">
      {/*
        Background #1: A subtle radial gradient in the center,
        transitioning to black around the edges
      */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black opacity-90"></div>

      {/*
        Background #2: A large pink/purple gradient "blob" in the top-right
        (just an example shape)
      */}
      <div
        className="pointer-events-none absolute -top-1/3 -right-1/3 h-[600px] w-[600px] rounded-full 
                   bg-gradient-to-r from-purple-600 to-pink-600 blur-3xl opacity-40"
      ></div>

      {/*
        Background #3: Another gradient blob on the bottom-left
      */}
      <div
        className="pointer-events-none absolute -bottom-1/4 -left-1/4 h-[400px] w-[400px] rounded-full 
                   bg-gradient-to-r from-blue-500 to-green-400 blur-3xl opacity-30"
      ></div>

      <div className="relative z-10 text-center flex flex-col items-center space-y-6 px-4">
        {/* Animated Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-fadeIn">
          Welcome to PopReel!
        </h1>
        <p className="text-lg text-gray-300 max-w-md animate-fadeIn delay-[200ms]">
          Your platform for sharing and exploring amazing content.
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-transform animate-fadeIn delay-[400ms]"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
