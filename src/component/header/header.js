import "./header.css";

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="img/monami_logo.png" alt="monami_logo"></img>
      </div>
      <div className="nav">
        <span>모나미소개</span>
        <span>모나미제품</span>
      </div>
      <div className="HeaderBtn">
        <div className="Search">ㅇ</div>
        <div className="Allmenu">ㅌ</div>
      </div>
    </header>
  );
}

export default Header;
