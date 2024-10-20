"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthBadge() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="relative w-18 h-18">
        <Link href="/profile">
          <Image
            src={session.user.image || "/public/user-line.svg"}
            width={40}
            height={40}
            alt="User 's image"
            className="rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="profile"
      className="p-3 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      Authenticate
    </Link>
  );
}
