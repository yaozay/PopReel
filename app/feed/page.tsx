"use client";

import React, { useState } from "react";
import { FaThumbsUp, FaCommentAlt, FaShareAlt } from "react-icons/fa";

interface Video {
  id: number;
  url: string;
  title: string;
  description: string;
  likes: number;
  comments: string[]; 
}

const FeedPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      url: "https://popreel-videos.s3.us-east-2.amazonaws.com/IMG_0946.mp4",
      title: "Sample Video",
      description: "This is a test video uploaded to S3.",
      likes: 0,
      comments: [], 
    },
  ]);

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
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === id
            ? { ...video, comments: [...video.comments, comment] }
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
    <div className="flex flex-col items-center p-4 space-y-6">
      <h1 className="text-2xl font-bold">Feed</h1>
      {videos.map((video) => (
        <div
          key={video.id}
          className="max-w-md w-full shadow-lg rounded-lg overflow-hidden mb-6"
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
            <div className="flex space-x-6 mt-4">
              <button
                className="flex items-center space-x-2 text-blue-500 hover:underline"
                onClick={() => handleLike(video.id)}
              >
                <FaThumbsUp /> <span>Like ({video.likes})</span>
              </button>
              <button
                className="flex items-center space-x-2 text-blue-500 hover:underline"
                onClick={() => handleComment(video.id)}
              >
                <FaCommentAlt /> <span>Comment</span>
              </button>
              <button
                className="flex items-center space-x-2 text-blue-500 hover:underline"
                onClick={() => handleShare(video.id)}
              >
                <FaShareAlt /> <span>Share</span>
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold">Comments:</h3>
              {video.comments.length > 0 ? (
                <ul className="text-sm text-gray-700 space-y-2">
                  {video.comments.map((comment, index) => (
                    <li key={index} className="border-b pb-1">
                      {comment}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedPage;
