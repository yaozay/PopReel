// components/NavBar.tsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <div className="text-lg font-bold">PopReel</div>
      <div className="flex gap-4">
        <Link href="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link href="/feed" className="hover:text-blue-400">
          Feed
        </Link>
        <Link href="/profile" className="hover:text-blue-400">
          Profile
        </Link>
      </div>
    </nav>
  );
}
