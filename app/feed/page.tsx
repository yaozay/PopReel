"use client";

import React, { useState, useEffect, useRef } from "react";
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

  // Hard-coded video list, same as before
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      url: "https://popreel-videos.s3.us-east-2.amazonaws.com/cruise.mp4",
      title: "Sample Video",
      description: "This is a test video uploaded to S3.",
      likes: 0,
      comments: [],
    },
    {
      id: 2,
      url: "https://popreel-videos.s3.us-east-2.amazonaws.com/mrbeast.mp4",
      title: "Sample Video",
      description: "This is a test video uploaded to S3.",
      likes: 0,
      comments: [],
    },
    {
      id: 3,
      url: "https://popreel-videos.s3.us-east-2.amazonaws.com/squidgame.mp4",
      title: "Sample Video",
      description: "This is a test video uploaded to S3.",
      likes: 0,
      comments: [],
    },
    {
      id: 4,
      url: "https://popreel-videos.s3.us-east-2.amazonaws.com/househ.mp4",
      title: "Sample Video",
      description: "This is a test video uploaded to S3.",
      likes: 0,
      comments: [],
    },
    {
      id: 5,
      url: "https://popreel-videos.s3.us-east-2.amazonaws.com/monkey.mp4",
      title: "Another Video",
      description: "This is another test video uploaded to S3.",
      likes: 0,
      comments: [],
    },
  ]);

  // Which video is currently in the viewport (we’ll auto-play it)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Refs to each <video> element
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // If user not signed in, redirect
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  // IntersectionObserver: detect which video is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If a video is more than 50% visible, set it as active
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.5, // 50% of the video must be in view
      }
    );

    // Observe each video element
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    // Cleanup
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  // Whenever activeIndex changes, play that video & pause others
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) {
        // Attempt to play
        video.play().catch((err) => {
          console.warn("Auto-play blocked:", err);
        });
      } else {
        // Pause other videos
        video.pause();
        video.currentTime = 0; // if you want them to reset to start
      }
    });
  }, [activeIndex]);

  // Simple local like function (no API call)
  const handleLike = (id: number) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  // Same comment & share as before
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
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="relative bg-black text-white max-w-md w-full shadow-lg rounded-lg overflow-hidden"
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              data-index={index}
              src={video.url}
              preload="auto"
              playsInline
              className="w-full h-auto"
            />

            {/* Interaction Panel */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-8">
              <button
                className="flex flex-col items-center text-gray-300 hover:text-red-500"
                onClick={() => handleLike(video.id)}
              >
                <FaHeart className="text-2xl" />
                <span className="text-sm">{video.likes}</span>
              </button>

              <button
                className="flex flex-col items-center text-gray-300 hover:text-blue-500"
                onClick={() => handleComment(video.id)}
              >
                <FaCommentDots className="text-2xl" />
                <span className="text-sm">{video.comments.length}</span>
              </button>

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
