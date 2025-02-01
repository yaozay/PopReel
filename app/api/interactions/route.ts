import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { videoId, eventType } = await req.json();
    const { userId } = getAuth(req); 

    if (!userId) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    await prisma.userInteraction.create({
      data: {
        userId,  
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
