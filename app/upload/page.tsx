"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      setUploading(true);

      // Prepare form data
      const formData = new FormData();
      formData.append("video", file);

      // POST to your upload API route (e.g. /api/upload)
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        // DO NOT set "Content-Type" yourself; FormData does it automatically
      });

      if (response.ok) {
        setSuccessMessage("Upload successful!");

        // If you want to show the new video on your feed,
        // either fetch fresh data in your feed page or redirect:
        router.push("/feed");
      } else {
        console.error("Upload failed:", response.statusText);
        alert("Upload failed. Please check the server logs or try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during the upload. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Your Video</h1>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`px-4 py-2 rounded transition-colors ${
          uploading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {successMessage && (
        <p className="mt-4 text-green-500">{successMessage}</p>
      )}
    </div>
  );
}
