"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { FaHeart, FaCommentDots, FaShare } from "react-icons/fa";
import Head from "next/head";

interface Video {
  id: number;
  url: string;
  title: string;
  description: string;
  likes: number;
  comments: { text: string; timestamp: string }[];
}

const FeedPage: React.FC = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      url: "https://popreel-videos.s3.us-east-2.amazonaws.com/IMG_0946.mp4",
      title: "Sample Video",
      description: "This is a test video uploaded to S3.",
      likes: 0,
      comments: [],
    },
    {
      id: 2,
      url: "https://popreel-videos.s3.us-east-2.amazonaws.com/devlet.mp4", 
      title: "Another Video",
      description: "This is another test video uploaded to S3.",
      likes: 0,
      comments: [],
    },
  ]);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  const handleLike = (id: number) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  const handleComment = (id: number) => {
    const comment = prompt("Enter your comment:");
    if (comment) {
      const timestamp = new Date().toLocaleString();
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === id
            ? {
                ...video,
                comments: [...video.comments, { text: comment, timestamp }],
              }
            : video
        )
      );
    }
  };

  const handleShare = (id: number) => {
    const shareUrl = `${window.location.origin}/videos/${id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Video URL copied to clipboard!");
  };

  return (
    <>
      <Head>
        <title>PopReel | Feed</title>
        <meta name="description" content="Explore the latest videos on PopReel" />
      </Head>
      <div className="flex flex-col items-center p-4 space-y-6 bg-gray-900 min-h-screen">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative bg-black text-white max-w-md w-full shadow-lg rounded-lg overflow-hidden"
          >
            {/* Video Player */}
            <video
              src={video.url}
              controls
              className="w-full h-auto"
              preload="auto"
            />

            {/* Interaction Panel */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-8">
              {/* Like Button */}
              <button
                className="flex flex-col items-center text-gray-300 hover:text-red-500"
                onClick={() => handleLike(video.id)}
              >
                <FaHeart className="text-2xl" />
                <span className="text-sm">{video.likes}</span>
              </button>

              {/* Comment Button */}
              <button
                className="flex flex-col items-center text-gray-300 hover:text-blue-500"
                onClick={() => handleComment(video.id)}
              >
                <FaCommentDots className="text-2xl" />
                <span className="text-sm">{video.comments.length}</span>
              </button>

              {/* Share Button */}
              <button
                className="flex flex-col items-center text-gray-300 hover:text-green-500"
                onClick={() => handleShare(video.id)}
              >
                <FaShare className="text-2xl" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeedPage;
