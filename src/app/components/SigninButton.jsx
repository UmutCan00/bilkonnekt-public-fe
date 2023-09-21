"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();
  console.log(session);
  console.log(session?.user?.username);

  if (session && session.user) {
    // Check if session is loading or user is not authenticated
    if (!session) {
      return null;
    }

    // Check if session.user.username is available
    const username = session.user?.username;

    return (
      <div className="flex gap-4 ml-auto">
        {username && <p className="text-sky-600">{username}</p>}
        <Link
          href="/api/auth/signout"
          className="flex gap-4 ml-auto text-red-600"
        >
          Sign Out
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-4 ml-auto items-center">
      <Link
        href={"/api/auth/signin"}
        className="flex gap-4 ml-auto text-green-600"
      >
        Sign In
      </Link>
      <Link
        href={"/signup"}
        className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default SignInButton;
