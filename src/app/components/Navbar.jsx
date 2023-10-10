import Link from "next/link";
import React from "react";
import SignInButton from "./SigninButton";

const Navbar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        <span className="text-black">Home Page</span>
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/dashboard"}
      >
        <span className="text-black">DashBoard</span>
      </Link>
        <Link className="transition-colors hover:text-blue-500" href={"/academic"}>
            <span className="text-black">Academic</span>
        </Link>

      <SignInButton />
    </header>
  );
};

export default Navbar;
