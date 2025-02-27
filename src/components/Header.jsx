import React from "react";
import '../style/Header.css'
import Cbutton from "./buttons/CButton";
import { useEffect } from "react";
import domainColorMap from '../style/foregroundColor.json'

const Header = () => {
  useEffect(() => {
    const domain = window.location.hostname;
    const appHeader = document.querySelector('.header');
    console.log(domainColorMap);
    if (domainColorMap[domain]) {
      appHeader.style.backgroundColor = domainColorMap[domain];
    } else {
      appHeader.style.backgroundColor = '#181818';
    }
  }, [])
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
