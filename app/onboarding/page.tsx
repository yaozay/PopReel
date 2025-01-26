// app/onboarding/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";  // <<--- import from "@clerk/nextjs"
import prisma from "@/lib/db";         // your Prisma client
import React from "react";

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (user?.username) {
    redirect("/profile");
  }

  // Server Action
  async function handleOnboarding(formData: FormData) {
    "use server"; // <--- This makes it a server action

    const { userId } = await auth();
    if (!userId) {
      redirect("/sign-in");
    }

    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;

    await prisma.user.update({
      where: { clerkId: userId },
      data: { username, bio },
    });

    redirect("/profile");
  }

  return (
    <form action={handleOnboarding}>
      <input name="username" placeholder="Username" required />
      <textarea name="bio" placeholder="Short bio..." />
      <button type="submit">Save</button>
    </form>
  );
}
