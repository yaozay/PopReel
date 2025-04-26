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


  if (!user || !user.username) {
    redirect("/onboarding");
  }

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">

      <div className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
            <div className="flex items-center space-x-4">

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

          <div className="flex justify-around bg-gray-800 p-4 rounded-xl shadow-lg mb-6">
            <div className="text-center">
              <span className="text-lg font-bold">0</span>
              <span className="text-gray-400 text-sm block">Followers</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold">1</span>
              <span className="text-gray-400 text-sm block">Following</span>
            </div>
            <div className="text-center">
              <span className="text-lg font-bold">0</span>
              <span className="text-gray-400 text-sm block">Uploads</span>
            </div>
          </div>


          <div>
            <h2 className="text-lg font-bold mb-4">My Videos</h2>
            <p className="text-gray-400">No videos uploaded yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
