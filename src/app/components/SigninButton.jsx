"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "react-bootstrap/Button";

const SignInButton = () => {
  const { data: session } = useSession();
  const username = session?.user?.username;

  return (
    <div className="d-flex align-items-center">
      {username ? (
        <>
          <div className="text-primary mr-3">{username}</div>
          <Button
            type="button"
            className="btn btn-danger"
            href="/api/auth/signout"
          >
            Sign Out
          </Button>
        </>
      ) : (
        <div className="d-flex align-items-center">
          <div className="mr-2">
            <Button
              type="button"
              className="btn btn-success"
              href="/api/auth/signin"
            >
              Sign In
            </Button>
          </div>
          <div>
            <Button type="button" className="btn btn-success" href="/signup">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInButton;
