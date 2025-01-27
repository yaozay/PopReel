"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Video {
  id: string;
  url: string;
  title: string;
  description: string;
}

const FeedPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        setError("Failed to load videos.");
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>
      <div className="w-full max-w-2xl">
        {videos.map((video) => (
          <div
            key={video.id}
            className="mb-8 bg-white shadow-md rounded-lg overflow-hidden"
          >
            <video
              src={video.url}
              controls
              className="w-full h-auto"
              preload="auto"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-600">{video.description}</p>
              <div className="flex space-x-4 mt-2">
                <button className="text-blue-500 hover:underline">Like</button>
                <button className="text-blue-500 hover:underline">
                  Comment
                </button>
                <Link
                  href={`/profile/${video.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Share
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
