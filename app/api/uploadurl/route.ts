import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function GET(request: NextRequest) {
  const fileName = request.nextUrl.searchParams.get("fileName");
  const fileType = request.nextUrl.searchParams.get("fileType");

  if (!fileName || !fileType) {
    return NextResponse.json({ error: "Missing fileName or fileType" }, { status: 400 });
  }

  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read",
    };

    const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
    return NextResponse.json({ uploadUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
