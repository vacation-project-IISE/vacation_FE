import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import LoginBtn from "../buttons/loginBtn/loginBtn";

function Header() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 상태 초기화
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token); // 토큰이 있으면 true, 없으면 false
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 토큰 제거
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/login");
  };

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  const GoToHome = () => {
    navigate("/");
  };

  const GoToLogin = () => {
    navigate("/login");
  };

  const GoToSearch = () => {
    navigate("/search");
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
  const GoToProduct = (code, index) => {
    setSelectedIndex(index);
    navigate(`/product/product_list/${code}`);
  };
  const GoToShopping = async () => {

    if (!isLogin) {
      alert("로그인을 먼저 해주세요!");
      navigate("/login");
      return;
    }
    navigate("/shopping/cart");
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
              <p onClick={() => GoToProduct("005", 0)}>
                <span>모나미제품</span>
              </p>
              <ul className={`Dropdown ${hoverIndex === 1 ? "hover" : ""}`}>
                <li onClick={() => GoToProduct("005", 0)}>
                  <a>프리미엄 펜</a>
                </li>
                <li onClick={() => GoToProduct("003", 1)}>
                  <a>펜·펜슬</a>
                </li>
                <li onClick={() => GoToProduct("004", 2)}>
                  <a>마카·컬러링</a>
                </li>
                <li onClick={() => GoToProduct("002", 3)}>
                  <a>노트·사무용품</a>
                </li>
                <li onClick={() => GoToProduct("001", 4)}>
                  <a>잉크·리필</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="HeaderBtn">
          <LoginBtn onClick={GoToLogin} />
          <div className="ShoppingCart" onClick={GoToShopping}>
            <img src="/img/blackCartIcon.png" alt="ShoppingCart"></img>
          </div>
          <div className="Search" onClick={GoToSearch}>
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
            <li onClick={() => GoToProduct("005", 0)}>
              <a>프리미엄 펜</a>
            </li>
            <li onClick={() => GoToProduct("003", 1)}>
              <a>펜·펜슬</a>
            </li>
            <li onClick={() => GoToProduct("004", 2)}>
              <a>마카·컬러링</a>
            </li>
            <li onClick={() => GoToProduct("002", 3)}>
              <a>노트·사무용품</a>
            </li>
            <li onClick={() => GoToProduct("001", 4)}>
              <a>잉크·리필</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
