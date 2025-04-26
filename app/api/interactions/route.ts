import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Incoming request");

    const body = await req.json().catch((err) => {
      console.error("Error parsing JSON:", err);
      return null;
    });

    console.log("Parsed body is:", body);

    if (!body) {
 
      return NextResponse.json({ error: "No valid JSON body" }, { status: 400 });
    }

    const { videoId, eventType } = body;


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
