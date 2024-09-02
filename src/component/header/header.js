import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  const GoToHome = () => {
    navigate("/");
  };

  const GoToLogin = () => {
    navigate("/login");
  };

  const GoToAbout = () => {
    navigate("/about/ceo");
  };
  const GoToCompany = () => {
    navigate("/about/company");
  };
  const GoToHistory = () => {
    navigate("/about/history");
  };
  const GoToConduct = () => {
    navigate("/about/conduct");
  };
  const GoToLocation = () => {
    navigate("/about/location");
  };
  const GoToProduct = () => {
    navigate("/product");
  };

  const handleMouseEnter = index => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div>
      <header>
        <div className="NavWrap">
          <div className="logo">
            <img
              src="/img/monamiLogo.png"
              alt="monamiLogo"
              onClick={GoToHome}></img>
          </div>
          <div className="nav">
            <div
              className={`NavSection ${hoverIndex === 0 ? "hover" : ""}`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}>
              <p onClick={GoToAbout}>
                <span>모나미소개</span>
              </p>
              <ul className={`Dropdown ${hoverIndex === 0 ? "hover" : ""}`}>
                <li>
                  <a onClick={GoToAbout}>CEO 메시지</a>
                </li>
                <li onClick={GoToCompany}>
                  <a>회사정보</a>
                </li>
                <li onClick={GoToHistory}>
                  <a>회사연혁</a>
                </li>
                <li onClick={GoToConduct}>
                  <a>윤리강령</a>
                </li>
                <li onClick={GoToLocation}>
                  <a>찾아오시는 길</a>
                </li>
              </ul>
            </div>
            <div
              className={`NavSection ${hoverIndex === 1 ? "hover" : ""}`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}>
              <p onClick={GoToProduct}>
                <span>모나미제품</span>
              </p>
              <ul className={`Dropdown ${hoverIndex === 1 ? "hover" : ""}`}>
                <li onClick={GoToProduct}>
                  <a>프리미엄 펜</a>
                </li>
                <li>
                  <a>펜·펜슬</a>
                </li>
                <li>
                  <a>마카·컬러링</a>
                </li>
                <li>
                  <a>노트·사무용품</a>
                </li>
                <li>
                  <a>잉크·리필</a>
                </li>
                <li>
                  <a>카탈로그</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="HeaderBtn">
          <button className="LoginBtn" onClick={GoToLogin}>
            로그인
          </button>
          <div className="Search">
            <img src="/img/search.png" alt="search"></img>
          </div>
          <div className="AllMenuBtn">
            <a
              className={`menuTrigger ${isActive ? "active-1" : ""}`}
              href="#"
              onClick={handleMenuClick}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </div>
      </header>
      <div className={`AllMenu ${isActive ? "active" : ""}`}>
        <div className="MenuBox">
          <h2>모나미소개</h2>
          <ul>
            <li onClick={GoToAbout} style={{ cursor: "pointer" }}>
              <a>CEO 메시지</a>
            </li>
            <li onClick={GoToCompany} style={{ cursor: "pointer" }}>
              <a>회사정보</a>
            </li>
            <li onClick={GoToHistory} style={{ cursor: "pointer" }}>
              <a>회사연혁</a>
            </li>
            <li onClick={GoToConduct} style={{ cursor: "pointer" }}>
              <a>윤리강령</a>
            </li>
            <li onClick={GoToLocation} style={{ cursor: "pointer" }}>
              <a>찾아오시는 길</a>
            </li>
          </ul>
        </div>
        <div className="MenuBox">
          <h2>모나미제품</h2>
          <ul>
            <li>
              <a>프리미엄 펜</a>
            </li>
            <li>
              <a>펜·펜슬</a>
            </li>
            <li>
              <a>마카·컬러링</a>
            </li>
            <li>
              <a>노트·사무용품</a>
            </li>
            <li>
              <a>잉크·리필</a>
            </li>
            <li>
              <a>카탈로그</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
