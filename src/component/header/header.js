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
              onMouseLeave={handleMouseLeave}
            onClick={GoToAbout}>
              <p>
                <span>모나미소개</span>
              </p>
              <ul className={`Dropdown ${hoverIndex === 0 ? "hover" : ""}`}>
                <li>
                  <a>CEO 메시지</a>
                </li>
                <li>
                  <a>회사정보</a>
                </li>
                <li>
                  <a>회사연혁</a>
                </li>
                <li>
                  <a>윤리강령</a>
                </li>
                <li>
                  <a>찾아오시는 길</a>
                </li>
              </ul>
            </div>
            <div
              className={`NavSection ${hoverIndex === 1 ? "hover" : ""}`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}>
              <p>
                <span>모나미제품</span>
              </p>
              <ul className={`Dropdown ${hoverIndex === 1 ? "hover" : ""}`}>
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
            <li>
              <a>CEO 메시지</a>
            </li>
            <li>
              <a>회사정보</a>
            </li>
            <li>
              <a>회사연혁</a>
            </li>
            <li>
              <a>윤리강령</a>
            </li>
            <li>
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