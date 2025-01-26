"use client";

import React, { useState } from "react";

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file) return;
    setUploading(true);

    try {
      // 1. Request a presigned URL
      const fileName = encodeURIComponent(file.name);
      const fileType = encodeURIComponent(file.type);
      const res = await fetch(`/api/uploadurl?fileName=${fileName}&fileType=${fileType}`);
      const { uploadUrl } = await res.json();

      // 2. Upload the file to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      // 3. Display success message
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload video");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h1>Upload a Video</h1>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
