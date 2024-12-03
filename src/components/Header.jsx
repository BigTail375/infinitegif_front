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
      </div>

      {/* Center Section: Add New Post Button */}
      <div className="header-center">
        <Cbutton buttonType={5}/>
        <Cbutton buttonType={3}/>
        <Cbutton buttonType={4}/>
        <Cbutton buttonType={1}/>
        <Cbutton buttonType={2}/>
        <Cbutton buttonType={6}/>
        <Cbutton buttonType={7}/>
        <Cbutton buttonType={8}/>
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
