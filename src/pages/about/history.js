import Header from "../../component/header/header";
import NavBtn from "../../component/buttons/navBtn";
import Footer from "../../component/footer/footer";
import "./about.css";
function History() {
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="AboutPage">
      <Header />
      <div className="AboutTop">
        <h2>모나미소개</h2>
        <p>언제 어디서나 모나미는 당신 곁에 있습니다.</p>
      </div>
      <div className="BtnBox">
        <NavBtn SelectedIndex={2} />
      </div>
      <div className="Contents">
        <h3 className="Title1">
          MONAMI <span>HISTORY</span>
        </h3>
      </div>
      <div className="History">
        <div className="BgArea1"></div>
        <div className="BgArea2"></div>
        <div className="BgArea3"></div>
        <div className="CenterLine"></div>

        <div className="HistoryBox">
          <div className="HistoryContent">
            <div className="TitleArea">
              <div className="Tit">
                문화를 선도하는<br></br>기업으로서의<span> 도약</span>
              </div>
              <div className="Year">
                <span>2021 ~ 2024</span>
              </div>
              <div className="Red"></div>
            </div>
            <div className="TextArea">
              <div>
                모나미 컨셉스토어 수원점 오픈<span>2024</span>
              </div>
              <div style={{paddingRight:"6%"}}>사무용품 브랜드 LOBDA(롭다) 론칭</div>
            </div>
            <div className="TextArea">
              <div>
                모나미 패션 랩 브랜드 런칭<span>2023</span>
              </div>
              <div style={{paddingRight:"6%"}}>153 ID 만년필, 153 리스펙트 리파인 출시</div>
            </div>
            <div className="TextArea">
              <div>
                모나미 컨셉스토어 성수점 오픈<span>2022</span>
              </div>
              <div style={{paddingRight:"6%"}}>모나미 코스메틱 용인 공장 신축</div>
            </div>
            <div className="TextArea">
              <div>
                디자인 문구 브랜드 제니스(Zenith), 지퀀스(ZEQUENZ) 론칭
                <span>2021</span>
              </div>
              <div style={{paddingRight:"6%"}}>모나미몰 쇼핑 앱 출시</div>
            </div>
          </div>
          <div className="HistoryImg">
            <img src="/img/HistoryImg1.png" alt="HistoryImg1"></img>
          </div>
        </div>

        <div className="HistoryBox">
          <div className="HistoryContent">
            <div className="TitleArea">
              <div className="Tit">
                새로운<br></br>50년의<span> 시작</span>
              </div>
              <div className="Year">
                <span>2010 ~ 2020</span>
              </div>
              <div className="Red"></div>
            </div>
            <div className="TextArea">
              <div>
                <span>2020</span>
                모나미 창립 60주년 기념 프러스펜 3000 데스크펜, 프러스펜 3000
                60색 세트 출시
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2019</span>
                모나미 컨셉스토어 인사동점 오픈
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2018</span>
                대한민국 디자인 대상 디자인 경영부문 국무총리상 수상
                <div style={{paddingLeft:"6%"}}>
                  모나미 스토어 오픈 (롯데백화점 부산점/평촌점, MCC 합정)
                </div>
                <div style={{paddingLeft:"6%"}}>153 고급필기구 런칭 (153 NEO 만년필)</div>
                <div style={{paddingLeft:"6%"}}>모나미 타일랜드 아마타공장 증축</div>
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2017</span>153 고급 필기구 런칭(153 GOLD)
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2016</span>모나미 컨셉스토어 2호점(DDP) / 3호점(에버랜드)
                오픈
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2015</span>국내문구업계 최초 모나미 컨셉스토어 1호점 오픈
                (서울 합정동)
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2014</span>
                153 고급 필기구 런칭 (153 리미티드, 153 ID, 153 리스펙트)
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2013</span>
                153 볼펜 출시 50년 / 프러스펜 S 출시
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2012</span>
                기업용 홍보 통합 제작 서비스 MPOD 솔루션 설립
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2010</span>
                모나미 창립 50주년 / 모나미 타일랜드 아마타공장 신축
              </div>
            </div>
          </div>
          <div className="HistoryImg">
            <img src="/img/HistoryImg2.png" alt="HistoryImg2"></img>
          </div>
        </div>

        <div className="HistoryBox">
          <div className="HistoryContent">
            <div className="TitleArea">
              <div className="Tit">
                사무용품 유통서비스<br></br>기업으로의<span> 도약</span>
              </div>
              <div className="Year">
                <span style={{right:"300px"}}>2006 ~ 2009</span>
              </div>
              <div className="Red"></div>
            </div>
            <div className="TextArea">
              <div>
                프로유성매직 국내문구 최초 RED DOT AWARD 수상<span>2009</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
                모나미스테이션 사업개시<span>2007</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
                세계최초 생잉크 보드마커 시그마플로 출시<span>2007</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
                MIS(모나미이미징솔루션)설립<span>2006</span>
              </div>
            </div>
          </div>
          <div className="HistoryImg">
            <img src="/img/HistoryImg3.png" alt="HistoryImg3"></img>
          </div>
        </div>
        <div className="HistoryBox">
          <div className="HistoryContent">
            <div className="TitleArea">
              <div className="Tit">
                글로벌<br></br>기업으로서의 <span>도약</span>
              </div>
              <div className="Year"  style={{left:"325px"}}>
                <span>2000 ~ 2001</span>
              </div>
              <div className="Red"></div>
            </div>
            <div className="TextArea">
              <div>
                <span>2001</span>상해 모나미 문화용품 유한공사 (중국현지법인)
                설립
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2001</span>
                Zenith-MonAmi 설립 (폴란드 합작법인)
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2001</span>
                e-비지니스 사업부 신설
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>2000</span>
                (주)익스프레스라인 14와 합병
              </div>
            </div>
          </div>
          <div className="HistoryImg">
            <img src="/img/HistoryImg4.png" alt="HistoryImg4"></img>
          </div>
        </div>
        <div className="HistoryBox">
          <div className="HistoryContent">
            <div className="TitleArea">
              <div className="Tit">
                사업진출<br></br>
                <span> 다각화</span>
              </div>
              <div className="Year" style={{right: "180px"}}>
                <span>1990 ~ 1996</span>
              </div>
              <div className="Red"></div>
            </div>
            <div className="TextArea">
              <div>
                (주)모나미로 (주)모나미 애드 합병<span>1996</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
                (주)모나미 애드 / 항소 인터내셔널 (미국)설립<span>1992</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
                (주)항소 설립<span>1990</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
                모나미 데이타 시스템 설립 (1992년 모나미컴퓨터시스템으로 변경)
                <span>1990</span>
              </div>
            </div>
          </div>
          <div className="HistoryImg">
            <img src="/img/HistoryImg5.png" alt="HistoryImg5"></img>
          </div>
        </div>
        <div className="HistoryBox">
          <div className="HistoryContent">
            <div className="TitleArea">
              <div className="Tit">
                모나미의<br></br>
                <span>성장기</span>
              </div>
              <div className="Year" style={{left: "170px"}}>
                <span>1970 ~ 1989</span>
              </div>
              <div className="Red"></div>
            </div>
            <div className="TextArea">
              <div>
                <span>1989</span>
                모나미 타일랜드 출범 (태국 차이아난다사와 합작)
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>1988</span>
                안산 공장 신축, 이전(1,2 공장 통합)
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>1974</span>
                주식회사 모나미로 상호변경 / 증권 거래소 주식 상장
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>1970</span>
                모나미 쎌라 만년필(주) 흡수합병
              </div>
            </div>
            <div className="TextArea">
              <div>
                <span>1970</span>
                제2공장 신축(성수동)
              </div>
            </div>
          </div>
          <div className="HistoryImg">
            <img src="/img/HistoryImg6.png" alt="HistoryImg6"></img>
          </div>
        </div>
        <div className="HistoryBox">
          <div className="HistoryContent">
            <div className="TitleArea">
              <div className="Tit">
              모나미의 창업과<br></br>
                <span> 도약기</span>
              </div>
              <div className="Year" style={{right:"170px"}}>
                <span >1960 ~ 1967</span>
              </div>
              <div className="Red"></div>
            </div>
            <div className="TextArea">
              <div>
              모나미 화학 공업 주식회사 설립<span>1967</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
              제1공장 신축(성수동)<span>1963</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
              사인펜, 매직펜 생산<span>1963</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
              153 볼펜 생산개시
                <span>1963</span>
              </div>
            </div>
            <div className="TextArea">
              <div>
              광신 화학 공업사 설립 (회화구류 생산 시작)
                <span>1960
                </span>
              </div>
            </div>
          </div>
          <div className="HistoryImg">
            <img src="/img/HistoryImg7.png" alt="HistoryImg7"></img>
          </div>
        </div>
      </div>
      <div className="BtnTop" onClick={MoveToTop}>
        <img src="/img/BtnTop.gif" alt="페이지 상단으로"></img>
      </div>
      <Footer/>
    </div>
  );
}

export default History;
