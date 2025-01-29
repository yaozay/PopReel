import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

// Configure AWS S3
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function GET(request: NextRequest) {
  // Get query parameters for fileName and fileType
  const fileName = request.nextUrl.searchParams.get("fileName");
  const fileType = request.nextUrl.searchParams.get("fileType");

  if (!fileName || !fileType) {
    return NextResponse.json(
      { error: "Missing fileName or fileType" },
      { status: 400 }
    );
  }

  try {
    // S3 parameters for the presigned URL
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!, // Bucket name from environment variables
      Key: fileName, // File name (e.g., "user-videos/video.mp4")
      Expires: 60, // URL expiration time (seconds)
      ContentType: fileType, // File type (e.g., "video/mp4")
      ACL: "public-read", // Access control
    };

    // Generate presigned URL
    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);

    return NextResponse.json({ uploadUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
