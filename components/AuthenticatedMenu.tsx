"use client";

import { RiArrowDropRightFill } from "@remixicon/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthenticatedMenu({ session }: { session: Session }) {
  return (
    <div className="flex flex-col items-center">
      <div>
        <Link
          href="emotions"
          className="flex my-1 hover:text-blue-500"
          style={{ animationDelay: "0.1s" }}
        >
          <RiArrowDropRightFill /> Monthly emotions
        </Link>
        <Link
          href="todays-emotion"
          className="flex my-1 hover:text-pink-500"
          style={{ animationDelay: "0.2s" }}
        >
          <RiArrowDropRightFill /> Today emotion
        </Link>
        <Link
          href="teams"
          className="flex my-1 hover:text-green-500"
          style={{ animationDelay: "0.3s" }}
        >
          <RiArrowDropRightFill /> My Teams
        </Link>
      </div>
      <hr className="h-px w-64 my-8 bg-gray-800 border-0 dark:bg-gray-200" />
      <p>
        Signed in as <b>{session.user?.email}</b>
      </p>
      <button
        onClick={() => signOut()}
        className="mx-auto my-2 text-gray-800 bg-white border border-gray-800 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:hover:bg-gray-700"
      >
        Sign out
      </button>
    </div>
  );
}
