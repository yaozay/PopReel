import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to PopReel</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your platform for sharing and discovering amazing content.
      </p>
      <div className="mt-6">
        <Link
          href="/sign-up"
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
