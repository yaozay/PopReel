// app/profile/page.tsx
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  // If no user or no username, send them to onboarding
  if (!user || !user.username) {
    redirect("/onboarding");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
        Your Profile
      </h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio || "(empty)"} 
      </p>
      {user.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt="Profile Avatar"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
      )}
    </div>
  );
}
