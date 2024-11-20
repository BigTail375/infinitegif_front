import React from "react";
import '../style/Header.css'
import Cbutton from "./buttons/CButton";

const Header = () => {
  return (
    <header className="header">
      {/* Left Section: Logo */}
      <div className="header-left">
        <img
          src="/asset/logo.png" // Replace with the path to your logo
          alt="Logo"
          className="header-logo"
        />
        <button className="new-post-button">+ New Post</button>
      </div>

      {/* Center Section: Add New Post Button */}
      <div className="header-center">
        <Cbutton buttonType={3}/>
        <Cbutton buttonType={4}/>
        <Cbutton buttonType={1}/>
        <Cbutton buttonType={2}/>
      </div>

      {/* Right Section: Sign In / Sign Up */}
      <div className="header-right">
        <button className="sign-in-button">Sign In</button>
        <button className="sign-up-button">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
