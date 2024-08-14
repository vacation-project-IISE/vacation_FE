import "./footer.css"

function Footer() {
  return (
    <div className="Footer">
      <div className="Foot">
        <div className="FootPop">
          <div className="Privacy"></div>
          <div className="Email"></div>
        </div>
        <div className="FootTop">
          <h1>
            <img src="/img/footLogo.jpg" alt="footLogo"></img>
          </h1>
          <ul className="Fm">
            <li>
              <a href="/about/ceo">회사소개</a>
            </li>
            <li>
              <a className="PrivacyPop">개인정보처리방침</a>
            </li>
            <li>
              <a className="EmailPop">이메일무단수집거부</a>
            </li>
          </ul>
        </div>
        <div className="FootBtm">
          <div className="Info">
            <div className="Tit">INFO</div>
            <address>
              ADDRESS : 경기도 용인시 수지구 손곡로 17<span>l</span>TEL :
              031-216-0153<span>l</span>FAX : 031-270-5154
            </address>
            <p className="Copy">
              COPYRIGHT(C) MONAMI.CO.,LTD. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="CC">
            <div className="Tit">CUSTOMER CENTER</div>
            <div className="CCTel">080-022-0153</div>
            <a
              href="http://pf.kakao.com/_xjViFC/chat"
              target="blank"
              className="BtnKakao">
              카카오톡 문의
            </a>
          </div>
                  <div className="FamSite">
                      <a>FAMILY SITE</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
