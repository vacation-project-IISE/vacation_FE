import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  const GoToHome = () => {
    navigate("/")
  }
  const GoToLogin = () => {
    navigate("/login")
  }
  return (
    <header>
      <div className="NavWrap">
        <div className="logo">
          <img src="img/monami_logo.png" alt="monami_logo" onClick={GoToHome}></img>
        </div>
        <div className="nav">
          <div className="NavSection">
            <p>
              <span>모나미소개</span>
            </p>
            <ul className="Dropdown">
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
          <div className="NavSection">
            <p>
              <span>모나미제품</span>
            </p>
            <ul className="Dropdown">
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
        <button className="LoginBtn" onClick={GoToLogin}>로그인</button>
        <div className="Search">
          <img src="img/search.png" alt="search"></img>
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
      <div className="AllMenu" style={{ display: isActive ? 'flex' : 'none' }}>
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
    </header>
  );
}

export default Header;
