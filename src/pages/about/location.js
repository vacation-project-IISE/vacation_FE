import Header from "../../component/header/header";
import NavBtn from "../../component/buttons/navBtn";
import Footer from "../../component/footer/footer";

import LocationMap from "./locationmap";
import "./about.css";
function Location() {
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className="AboutPage">
      <Header />
      <div className="AboutTop">
        <h2>모나미소개</h2>
        <p>언제 어디서나 모나미는 당신 곁에 있습니다.</p>
      </div>
      <div className="BtnBox">
        <NavBtn SelectedIndex={4} />
      </div>
      <div className="Contents">
        <h3 className="Title1">
          MONAMI <span>CONTACT</span>
        </h3>
        <div className="Location">
          <div className="MapInfo">
            <LocationMap />
            <div className="TxtArea">
              <div className="LocationTit">
                <img src="/img/MonamiLogoWhite.jpg" alt="MonamiLogo"></img>
                <h4>모나미 본사 오시는 길</h4>
              </div>
              <div className="Locationtxt">
                <div className="TxtTitle">
                  <div>ADDRESS</div>
                  <div>TEL</div>
                </div>
                <div className="TxtContent">
                  <div>경기도 용인시 수지구 손곡로 17</div>
                  <div>(구)경기도 용인시 수지구 동천동 854-2</div>
                  <div>031-216-0153 / 080-022-0153</div>
                </div>
              </div>
              <div className="LocationImg">
                <img src="/img/LocationImg.jpg" alt="LocationImg"></img>
              </div>
            </div>
          </div>
          <div className="Traffic">
            <div className="Car">
              <div className="Tit">자가용 이용 시</div>
              <div className="Info">
                <ul>
                  <li>
                    판교IC를 빠져 나와 '수지/신갈' 방향으로 오시면 됩니다.
                  </li>
                </ul>
              </div>
            </div>
            <div className="Public">
              <div className="Tit">대중교통 이용 시</div>
              <div className="Info">
                <ul>
                  <li>지하철 : 신분당선 동천역 2번 출구 도보 10분 거리</li>
                  <li>
                    일반버스 :<br></br>분당선 미금역 7번 출구에서 버스 11번을
                    이용, 프레시원 정거장 하차<br></br>또는 700-2번, 5번을 이용,
                    KT 수지지사.물류센터 정거장 하차
                  </li>
                  <li>
                    광역버스 :<br></br>M4101번 (종로,을지로,남대문→동천동
                    현대홈타운2차아파트 정거장 하차)<br></br>6900번(잠실→동천동
                    현대홈타운2차아파트 정거장 하차)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="BtnTop" onClick={MoveToTop}>
                  <img src="/img/BtnTop.gif" alt="페이지 상단으로"></img>
      </div>
      <Footer />
    </div>
  );
}

export default Location;
