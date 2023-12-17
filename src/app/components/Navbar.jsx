import Link from "next/link";
import React from "react";
import SignInButton from "./SigninButton";
import { useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const { data: session } = useSession();
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
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/marketplace"}
      >
        <span className="text-black">Marketplace</span>
      </Link>
      <Link className="transition-colors hover:text-blue-500" href={"/social"}>
        <span className="text-black">Social</span>
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/academic"}
      >
        <span className="text-black">Academic</span>
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/lostfound"}
      >
        <span className="text-black">Lost & Found</span>
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/profilePage/" + session?.user?._id}
      >
        <span className="text-black">My Profile Page</span>
      </Link>

      <Link
        className="transition-colors hover:text-blue-500"
        href={"/clubpage"}
      >
        <span className="text-black">Student Clubs</span>
      </Link>

      <Link
        className="transition-colors hover:text-blue-500"
        href={"/todayinbilkent"}
      >
        <span className="text-black">Today in Bilkent</span>
      </Link>

      <Link
        className="transition-colors hover:text-blue-500"
        href={"/message/"}
      >
        <span className="text-black">Messages</span>
      </Link>

      <Link
        className="transition-colors hover:text-blue-500"
        href={"/reporttoadmin/"}
      >
          <span className="text-black">Report to admin</span>
        </Link>
      
        <div className="ml-auto">
        <SignInButton  />
        </div>
      
    </header>
  );
};

export default Navbar;
