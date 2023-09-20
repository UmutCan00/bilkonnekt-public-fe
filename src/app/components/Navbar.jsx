import React from "react";

const Navbar = () => {
  const signedIn = false;
  return (
    <div className="navbar">
      <button className="nav-button">Home</button>
      <button className="nav-button">About</button>
      <button className="nav-button">Services</button>
      <button className="nav-button">Contact</button>
      {signedIn ? (
        <button className="nav-button">Sign Out</button>
      ) : (
        <div>
          <button className="nav-button">Log In</button>
          <button className="nav-button">Sign In</button>
        </div>
      )}
      <style>{`.navbar {
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}

.nav-button {
  background-color: #555;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  text-decoration: none;
}

.nav-button:hover {
  background-color: #777;
}`}</style>
    </div>
  );
};

export default Navbar;
