"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthenticatedMenu({ session }: { session: Session }) {

    return       <>
            <p>Signed in as <b>{session.user?.email}</b></p>
            <button onClick={() => signOut()} className='mx-auto my-2 text-gray-800 bg-white border border-gray-800 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:hover:bg-gray-700'>Sign out</button>
        </>
}