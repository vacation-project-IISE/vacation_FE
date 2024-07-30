import React, { useState } from "react";
import "./header.css";

function Header() {
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };
  return (
    <header>
      <div className="NavWrap">
        <div className="logo">
          <img src="img/monami_logo.png" alt="monami_logo"></img>
        </div>
        <div className="nav">
          <span>모나미소개</span>
          <span>모나미제품</span>
        </div>
      </div>

      <div className="HeaderBtn">
        <div className="Search">
          <img src="img/search.png" alt="search"></img>
        </div>
        <div className="Allmenu">
          <a
            className={`menu-trigger ${isActive ? "active-1" : ""}`}
            href="#"
            onClick={handleMenuClick}>
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
