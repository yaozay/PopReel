import { NextResponse } from "next/server";
import prisma from "@/lib/db"; 

export async function GET() {
  try {
    const videos = await prisma.video.findMany(); 
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
