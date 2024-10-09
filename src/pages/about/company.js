import Header from "../../component/header/header";
import NavBtn from "../../component/buttons/navBtn";
import Footer from "../../component/footer/footer";
import "./about.css";
function Company() {
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
        <NavBtn SelectedIndex={1} />
      </div>
      <div className="Contents">
        <h3 className="Title1">
          COMPANY <span>INFO</span>
        </h3>
      </div>
      <div className="InfoWrap1">
        <h4 className="NumTitle">
          <span className="Num">01</span>
          계열사 소개
        </h4>
        <div className="Subslidiary">
          <div className="CompanyBox">
            <div className="CompanyLogo">
              <img src="/img/CosmeticLogo.png" alt="모나미코스메틱로고"></img>
            </div>
            <div className="CompanyImg">
              <img src="/img/CosmeticImg.png" alt="모나미코스메틱이미지"></img>
            </div>
            <div className="CompanyTxt">
              <p>
                고품질 색조 전문<br></br>OEM/ODM 기업
              </p>

              <div className="MoveBtn">
                <a
                  href="http://www.monamicosmetics.com/"
                  target="_blank"
                  rel="noreferrer">
                  사이트 바로가기
                </a>
              </div>
            </div>
          </div>
          <div className="CompanyBox">
            <div className="CompanyLogo">
              <img src="/img/HangsoLogo.jpg" alt="항소로고"></img>
            </div>
            <div className="CompanyImg">
              <img src="/img/HangsoImg.png" alt="항소이미지"></img>
            </div>
            <div className="CompanyTxt">
              <p>
                PARKER/WATERMAN<br></br>TOMBOW 국내 공식 수입업체
              </p>

              <div className="MoveBtn">
                <a
                  href="http://www.hangso.co.kr/"
                  target="_blank"
                  rel="noreferrer">
                  사이트 바로가기
                </a>
              </div>
            </div>
          </div>
          <div className="CompanyBox">
            <div className="CompanyLogo">
              <img src="/img/PlamaxLogo.png" alt="플라맥스로고"></img>
            </div>
            <div className="CompanyImg">
              <img src="/img/PlamaxImg.png" alt="플라맥스이미지"></img>
            </div>
            <div className="CompanyTxt">
              <p>
                모나미 문구제품 전문<br></br>제조 기업
              </p>

              <div className="MoveBtn">
                <a
                  href="http://www.plamaxkorea.com/"
                  target="_blank"
                  rel="noreferrer">
                  사이트 바로가기
                </a>
              </div>
            </div>
          </div>
          <div className="CompanyBox">
            <div className="CompanyLogo">
              <img src="/img/SolutionsLogo.jpg" alt="모나미솔루션스로고"></img>
            </div>
            <div className="CompanyImg">
              <img src="/img/SolutionsImg.jpg" alt="모나미솔루션이미지"></img>
            </div>
            <div className="CompanyTxt">
              <p>
                HP전산용품 & '통합출력관리<br></br>서비스' 솔루션 공급
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="InfoWrap2">
        <h4 className="NumTitle">
          <span className="Num">02</span>
          해외법인
        </h4>
        <div className="OverSea">
          <div className="MapArea">
            <img src="/img/MapImg.jpg" alt="MapImg"></img>
          </div>
          <div className="InfoBox">
            <div className="OverSea01">
              <div className="TitArea">
                <span>THAILAND</span>모나미 타일랜드(방콕)
              </div>
              <dl>
                <dt>법인명</dt>
                <dd>MONAMI THAILAND</dd>
              </dl>
              <dl>
                <dt>주소</dt>
                <dd>
                  #475 Siripinyo Bldg.,12th floor, Si Ayutthaya Rd.,Khwaeng
                  ThanonPhayathai, Khet Ratchathewi, Bangkok 10400 Thailand
                </dd>
              </dl>
              <dl>
                <dt>전화</dt>
                <dd>+66-2-640-0980-2</dd>
              </dl>
              <dl>
                <dt>팩스</dt>
                <dd>+66-2-640-0980-2</dd>
              </dl>
              <dl>
                <dt>SNS</dt>
                <dd>
                  <a href="https://www.facebook.com/monami.thailand/">
                    www.facebook.com/monami.thailand/
                  </a>
                </dd>
              </dl>
            </div>
            <div className="OverSea02">
              <div className="TitArea">
                <span>THAILAND</span>모나미 타일랜드 (아마타 공장)
              </div>
              <dl>
                <dt>주소</dt>
                <dd>
                Amata City Industrial Estate 7/281 Moo. 6 Mabyangporn, Plaukdang, Rayong 21140 Thailand
                </dd>
              </dl>
              <dl>
                <dt>전화</dt>
                <dd>+66-2-640-0980-2</dd>
              </dl>
            </div>
            <div className="OverSea03">
              <div className="TitArea">
                <span>CHINA</span>상해 모나미 (상하이)
              </div>
              <dl>
                <dt>법인명</dt>
                <dd>上海慕那美文化用品有限公司 (SHANGHAI MONAMI)</dd>
              </dl>
              <dl>
                <dt>홈페이지</dt>
                <dd>
                  <a href="http://www.monami.com.cn/">
                  www.monami.com.cn
                  </a>
                </dd>
              </dl>
              <dl>
                <dt>주소(중문)</dt>
                <dd>
                中国上海市嘉定工业区兴贤路1388号9号楼
                </dd>
              </dl>
              <dl>
                <dt>주소(영문)</dt>
                <dd>
                Building No.9 1388 XingXian Road, Jiading Industrial District, Shanghai, China
                </dd>
              </dl>
              <dl>
                <dt>전화</dt>
                <dd>+86-21-69521210-69521216</dd>
              </dl>
              <dl>
                <dt>팩스</dt>
                <dd>+86-21-69521250-59160776</dd>
              </dl>
              <dl>
                <dt>SNS</dt>
                <dd>
                  <a href="http://weibo.com/shmonami">
                  weibo.com/shmonami
                  </a>
                </dd>
              </dl>
            </div>
            <div className="OverSea04">
              <div className="TitArea">
                <span>POLAND</span>제니스 모나미 (바르샤바)
              </div>
              <dl>
                <dt>법인명</dt>
                <dd>ZENITH MONAMI</dd>
              </dl>
              <dl>
                <dt>주소</dt>
                <dd>
                ul. Poleczki 23, 02-822, Warsaw, Poland.
                </dd>
              </dl>
              
            </div>
          </div>
        </div>
        <div className="BtnTop" onClick={MoveToTop}>
                  <img src="/img/BtnTop.gif" alt="페이지 상단으로"></img>
              </div>
      </div>
      <Footer />
    </div>
  );
}

export default Company;
