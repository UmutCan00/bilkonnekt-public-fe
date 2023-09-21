"use client";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
const ProtectedPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Navbar />
      <h1>Protected Page</h1>
      {session ? (
        <p>Welcome, {session.user.username}!</p>
      ) : (
        <p>You are not authenticated. Please sign in.</p>
      )}
    </div>
  );
};

export default ProtectedPage;
