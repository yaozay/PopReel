// app/onboarding/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server"; // Import from "@clerk/nextjs"
import prisma from "@/lib/db"; // Your Prisma client
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
    "use server"; // This makes it a server action

    const { userId } = await auth();
    if (!userId) {
      redirect("/sign-in");
    }

    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (existingUser) {
      // Update the user if they already exist
      await prisma.user.update({
        where: { clerkId: userId },
        data: { username, bio },
      });
    } else {
      // Create a new user record if none exists
      await prisma.user.create({
        data: {
          clerkId: userId,
          username,
          bio,
        },
      });
    }

    redirect("/profile");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Set Up Your Profile
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Complete your profile to get started.
        </p>
        <form action={handleOnboarding} className="space-y-6">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Short Bio Input */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Short Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              placeholder="Tell us about yourself"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
