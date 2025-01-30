import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { userId } = await auth();

  // Redirect to sign-in if the user is not authenticated
  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch user details from the database
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  // Redirect to onboarding if the user or username is not set
  if (!user || !user.username) {
    redirect("/onboarding");
  }

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      {/* Sidebar is handled globally in layout */}
      <div className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="relative bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
            <div className="flex items-center space-x-4">
              {/* User Avatar */}
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Profile Avatar"
                  className="w-20 h-20 rounded-full border-4 border-gray-700"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
                  {user.username[0].toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-gray-400">@{user.username.toLowerCase()}</p>
              </div>
              <button className="ml-auto px-4 py-2 bg-blue-600 text-sm rounded-lg hover:bg-blue-500">
                Edit Profile
              </button>
            </div>
            <p className="mt-4 text-sm">{user.bio || "Add your bio here!"}</p>
          </div>

          {/* User Stats */}
          <div className="flex justify-around bg-gray-800 p-4 rounded-xl shadow-lg mb-6">
            <div className="text-center">
              <span className="text-lg font-bold">123</span>
              <span className="text-gray-400 text-sm block">Followers</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold">45</span>
              <span className="text-gray-400 text-sm block">Following</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold">10</span>
              <span className="text-gray-400 text-sm block">Uploads</span>
            </div>
          </div>

          {/* Uploaded Videos */}
          <div>
            <h2 className="text-lg font-bold mb-4">My Videos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg w-full h-40 flex items-center justify-center"
                  >
                    <p className="text-gray-400 text-sm">Video {index + 1}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
