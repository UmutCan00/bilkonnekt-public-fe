import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import SignInButton from "./SigninButton";
import { useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const { data: session } = useSession();
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  const socialRef = useRef(null);
  let timer;

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setShowSocialMenu(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setShowSocialMenu(false);
    }, 200);
  };

  const handleSubMenuMouseEnter = () => {
    clearTimeout(timer);
  };

  const handleSubMenuMouseLeave = () => {
    setShowSocialMenu(false);
  };

  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Button className="btn btn-dark" variant="" href={"/"}>
        <i className="bi bi-house-door-fill"></i> Home Page
      </Button>

      <Button className="btn btn-dark" variant="" href={"/marketplace"}>
        <i className="bi bi-cart-fill"></i> Marketplace
      </Button>

      <div className="position-relative">
        <Button
          className="btn btn-dark"
          variant=""
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          href={"/social"}
        >
          <i className="bi bi-globe"></i> Social
        </Button>
        {showSocialMenu && (
          <div
            className="position-absolute mt-1"
            style={{
              zIndex: "999",
              padding: "8px",
              marginTop: "-10px",
              width: socialRef.current ? socialRef.current.offsetWidth : "auto",
            }}
            onMouseEnter={handleSubMenuMouseEnter}
            onMouseLeave={handleSubMenuMouseLeave}
          >
            <Button className="btn btn-dark" variant="" href={"/clubpage"}>
              <i className="bi bi-people-fill"></i> Student Clubs
            </Button>

            <Button
              className="btn btn-dark"
              variant=""
              href={"/todayinbilkent"}
            >
              <i className="bi bi-calendar-fill"></i> Today in Bilkent
            </Button>

            <Button
              className="btn btn-dark"
              variant=""
              href={"/todayinbilkent"}
            >
              <i className="bi bi-calendar-fill"></i> Feed
            </Button>
          </div>
        )}
      </div>

      {/* Additional buttons */}
      <Button className="btn btn-dark" variant="" href={"/academic"}>
        <i className="bi bi-journal-text"></i> Academic
      </Button>

      <Button className="btn btn-dark" variant="" href={"/lostfound"}>
        <i className="bi bi-search"></i> Lost & Found
      </Button>

      <Button
        className="btn btn-dark"
        variant=""
        href={"/profilePage/" + session?.user?._id}
      >
        <i className="bi bi-person-fill"></i> My Profile Page
      </Button>

      <Button className="btn btn-dark" variant="" href={"/message"}>
        <i className="bi bi-envelope-fill"></i> Messages
      </Button>

      <Button className="btn btn-dark" variant="" href={"/reporttoadmin"}>
        <i className="bi bi-telephone-fill"></i> Contact Admin
      </Button>

      <div className="ml-auto">
        <SignInButton />
      </div>
    </header>
  );
};

export default Navbar;
