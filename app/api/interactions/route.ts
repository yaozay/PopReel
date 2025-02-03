import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Incoming request to /api/interactions...");

    // Try to parse the JSON body
    const body = await req.json().catch((err) => {
      console.error("Error parsing JSON:", err);
      return null;
    });

    console.log("Parsed body is:", body);

    if (!body) {
      // If we didn't get valid JSON, return a 400 error
      return NextResponse.json({ error: "No valid JSON body" }, { status: 400 });
    }

    const { videoId, eventType } = body;

    // Get the user ID from Clerk
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    // Insert row in Prisma
    await prisma.userInteraction.create({
      data: {
        userId,
        videoId,
        eventType,
      },
    });

    // On success
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Failed to record interaction:", err);

    return NextResponse.json(
      { error: "Failed to record interaction" },
      { status: 500 }
    );
  }
}
