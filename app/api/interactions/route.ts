import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    // 1) Parse the JSON body
    const { videoId, eventType } = await req.json();

    // 2) Grab the Clerk user ID from the server side
    // For Next.js 13 route handlers, use getAuth(req)
    const { userId } = getAuth(req); 
    // userId will be a string if signed in, or null if not authenticated

    // 3) If userId is null, handle unauthorized
    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    // 4) Create a new user interaction record
    await prisma.userInteraction.create({
      data: {
        userId,  // from Clerk
        videoId,
        eventType,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Failed to record interaction:", err);
    return NextResponse.json(
      { error: "Failed to record interaction" },
      { status: 500 }
    );
  }
}
