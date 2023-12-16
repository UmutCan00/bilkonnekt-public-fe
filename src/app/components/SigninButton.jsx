"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SignInButton = () => {
  const { data: session } = useSession();
  const username = session?.user?.username;

  return (
    <div className="d-flex align-items-center">
      {username ? (
        <>
          <p className="text-primary mr-3 mb-0">{username}</p>
          <Link href="/api/auth/signout" className="text-danger">
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <Link href="/api/auth/signin" className="text-success mr-3">
            Sign In
          </Link>
          <Link href="/signup">
            <button className="btn btn-success">Sign Up</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default SignInButton;
