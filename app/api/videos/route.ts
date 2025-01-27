import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure this points to your Prisma setup

export async function GET() {
  try {
    const videos = await prisma.video.findMany(); // Fetch videos from your database
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
