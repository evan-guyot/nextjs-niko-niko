"use client";

import { signIn, useSession } from 'next-auth/react';
import AuthenticatedMenu from './AuthenticatedMenu';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return <AuthenticatedMenu session={session} />
  }

  return <button onClick={() => signIn('github')} className='my-2 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:hover:bg-gray-700'>Sign in with GitHub</button>;
}
