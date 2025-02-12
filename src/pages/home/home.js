import Footer from "../../component/footer/footer.js";
import Header from "../../component/header/header.js";
import React  from "react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./home.css";

function Home() {
  // 상태 추가: 선택된 카테고리를 관리
  const [activeCategory, setActiveCategory] = useState("premium-pen");
  const [isPopupVisible, setIsPopupVisible] = useState(true); // 팝업 표시 상태 관리
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  

  // 로그인 상태 확인 (로컬스토리지에서 가져오기)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");

    if (token && expiry) {
      if (Date.now() >= Number(expiry)) {
        handleLogout(); // 만료된 경우 즉시 로그아웃
        console.log("토큰 확인 후 로그아웃!")
      } else {
        setIsLogin(true);
        console.log("토큰 없어서 로그아웃안함!")
        // 남은 시간 계산 후 로그아웃 예약
        const remainingTime = Number(expiry) - Date.now();
        setTimeout(() => handleLogout(), remainingTime);
      }
    }
  }, []);

   // 자동 로그아웃 함수
   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("token_expiry");
    setIsLogin(false);
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    navigate("/login");
  };


  // 카테고리 변경 함수
  const handleCategoryChange = category => {
    setActiveCategory(category);
  };
  const productIndexes = [
188, 186, 248, 204, 168
  ];

  // 클릭 시 해당 링크로 이동
  const handleImageClick = (index) => {
    const url = `/product/product_view/${index}`; 
    window.location.href = url; 
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false); // 팝업 숨기기
  };
  return (
    <div>
      <Header />
      <img src="img/hometop.jpg" className="home-top" alt="Home Top Image" />
      <div className="visual">
        <div className="textarea">
          <h3>
            어쩌면 삶은
            <br />
            인생이라는 종이 위에
            <br />
            써내려가는
            <br />
            펜의 기록 같습니다
            <br />
          </h3>
          <p>
            "그 중에서도 지우고 싶은 기록이 있습니다"
            <br />
            "모나미는 언제나 당신의 행복한 기록과 함께"
          </p>
        </div>
      </div>
      {isPopupVisible && (
      <div className="l-popup__buttons">
        <span>
          <img src="img/l-popup_img_1.png" alt="모나미몰"></img>
        </span>
        <span>
          "브랜드"
          <em>스토어</em>
        </span>
        <a
          className="l-popup-btn-1"
          href="https://brand.naver.com/monami"
          target="_blank"
          rel="noreferrer">
          <span className="btn_go">"바로가기"</span>
        </a>
        <a
          className="l-popup-btn-2"
          href="/customer/inquiry.php?bluk=10"
          target="_blank">
          <span className="btn_inquiry">"대량 구매 문의"</span>
        </a>
        <a
            className="l-popup__button--close"
            onClick={handleClosePopup}
            href="#">
          예약하기 버튼 닫기
        </a>
      </div>
      )}

      <div className="newarrival">
        <div className="newarrivalImgbox">
          <div>
            <div className="new">
              <h2>
                NEW <br /> ARRIVALS
              </h2>
              <p>가장 먼저 만나는 설레는 기다림</p>
            </div>
            <div
              className="image-container"
              data-category="PEN"
              data-product="FX ZETA C3"
              onClick={() => handleImageClick(productIndexes[0])}>
              <img
                src="img/zpen.jpg"
                className="home-zpen"
                alt
                width={392}
                height={205}
              />
            </div>
          </div>

          <div
            className="image-container"
            data-category="NOTE"
            data-product="지퀀스"
            onClick={() => handleImageClick(productIndexes[1])}>
            <img
              src="img/note.jpg"
              className="home-note"
              alt
              width={786}
              height={360}
            />
          </div>
        </div>

        <div className="newarrivalImgbox">
          <div
            className="image-container"
            data-category="PREMIUM PEN"
            data-product="프러스펜3000프라임"
            onClick={() => handleImageClick(productIndexes[2])}>
            <img
              src="img/pluspen.jpg"
              className="home-pluspen"
              alt
              width={392}
              height={292}
            />
          </div>
          <div
            className="image-container"
            data-category="FOUNTAIN PEN"
            data-product="153 아이디 만년필"
            onClick={() => handleImageClick(productIndexes[3])}>
            <img
              src="img/153pen.jpg"
              className="home-153pen"
              width={450}
              height={439}
            />
          </div>
          <div
            className="image-container"
            data-category="WATER-BASED MARKER"
            data-product="프러스펜 3000"
            onClick={() => handleImageClick(productIndexes[4])}>
            <img
              src="img/pluspen2.jpg"
              className="home-pluspen2"
              alt="Plus Pen 2"
            />
          </div>
        </div>
      </div>

      <div className="home-box2">
        <div className="tit">BEST PRODUCT</div>
        <p className="tit_btn">언제 어디서나 생활 속에 함께하는 모나미</p>

        {/* 카테고리 선택 버튼 */}
        <div className="p_tabs">
          <ul>
            <li
              className={activeCategory === "premium-pen" ? "on" : ""}
              onClick={() => handleCategoryChange("premium-pen")}>
              <a>프리미엄 펜</a>
            </li>
            <li
              className={activeCategory === "pen-pencil" ? "on" : ""}
              onClick={() => handleCategoryChange("pen-pencil")}>
              <a>펜-펜슬</a>
            </li>
            <li
              className={activeCategory === "marker-coloring" ? "on" : ""}
              onClick={() => handleCategoryChange("marker-coloring")}>
              <a>마카-컬러링</a>
            </li>
            <li
              className={activeCategory === "notebook" ? "on" : ""}
              onClick={() => handleCategoryChange("notebook")}>
              <a>노트-사무용품</a>
            </li>
          </ul>
        </div>

        {/* 카테고리별 상품 리스트 */}
        <div className="p_lists">
          <ul className="wrapper_ul">
            {activeCategory === "premium-pen" && (
              <>
                <li>
                  <a href="href=/product/product_view.php?idx=202&ccode=003005">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040136001_file6_1713138750ujw6qaj97g.jpg"
                        alt
                        width={266}
                        height={390}></img>
                    </div>
                    <div className="info">
                      <div className="cate">프리미엄 펜</div>
                      <div className="name">프러스펜 3000프라임</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="href=/product/product_view.php?idx=202&ccode=003005">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/8801067962537_file6_16993368522ze8t9y6ul.jpg"
                        alt
                        width={266}
                        height={390}></img>
                    </div>
                    <div className="info">
                      <div className="cate">프리미엄 펜</div>
                      <div className="name">153 리스펙트 리파인</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="href=/product/product_view.php?idx=202&ccode=003005">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040048020_file6_1681086837wink3y4zfr.jpg"
                        alt
                        width={266}
                        height={390}></img>
                    </div>
                    <div className="info">
                      <div className="cate">만년필</div>
                      <div className="name">153 아이디 만년필</div>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="href=/product/product_view.php?idx=202&ccode=003005">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040048012_file6_1583298386d4wy0fw22t.jpg"
                        alt
                        width={266}
                        height={390}></img>
                    </div>
                    <div className="info">
                      <div className="cate">만년필</div>
                      <div className="name">153 네오 만년필 EF</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="href=/product/product_view.php?idx=202&ccode=003005">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2010209001_file6_15106474920b1lr1fhnf.jpg"
                        alt
                        width={266}
                        height={390}></img>
                    </div>
                    <div className="info">
                      <div className="cate">프리미엄펜</div>
                      <div className="name">153 블랙 & 화이트</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="href=/product/product_view.php?idx=202&ccode=003005">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/0file6_15106488276b3copnqua.jpg"
                        alt
                        width={266}
                        height={390}></img>
                    </div>
                    <div className="info">
                      <div className="cate">프리미엄펜</div>
                      <div className="name">153 골드</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="href=/product/product_view.php?idx=202&ccode=003005">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040048012_file6_1583298386d4wy0fw22t.jpg"
                        alt
                        width={266}
                        height={390}></img>
                    </div>
                    <div className="info">
                      <div className="cate">프리미엄펜</div>
                      <div className="name">153 네오 만년필 EF</div>
                    </div>
                  </a>
                </li>
              </>
            )}
            {activeCategory === "pen-pencil" && (
              <>
                <li>
                  <a href="/product/product_view.php?idx=203&ccode=003006">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2100011114_file6_1680482799v8lz6c19ev.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">샤프/샤프심</div>
                      <div className="name">그리픽스 팝 샤프</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2080201010_file6_1680510368gmw1j11ihk.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">수성마카</div>
                      <div className="name">사인펜 슈퍼 24색 세트</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040240006_file6_16255408900kpz876plz.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">수성마카</div>
                      <div className="name">프러스펜 3000 피그먼트</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040016351_file6_16334947342g3aqx0uh1.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">수성마카</div>
                      <div className="name">라이브 칼라(화이트축)</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2010152034_file6_1699945497e4wvhszoxy.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">유성볼펜</div>
                      <div className="name">Fx ZETA C3</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2010030001_file6_1635127393stijdjvr99.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">유성볼펜</div>
                      <div className="name">제니스7</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2041019049_file6_1659673523b6tw8za4y1.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">수성마카</div>
                      <div className="name">프러스펜 3000 60색 세트</div>
                    </div>
                  </a>
                </li>
              </>
            )}
            {activeCategory === "marker-coloring" && (
              <>
                <li>
                  <a href="/product/product_view.php?idx=203&ccode=003006">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040002001_file6_15867537131mu8wvyj4p.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">워터브러쉬</div>
                      <div className="name">워터 리얼 브러쉬</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040005001_file6_1585872127mz32ryzzpt.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">수성마카</div>
                      <div className="name">컬러 리얼 브러쉬</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040012004_file6_161526431756qs7ja5jo.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">수성마카</div>
                      <div className="name">붓펜 12색 세트</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040009001_file6_1552521391bpvzh1xb2b.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">수성펜</div>
                      <div className="name">컬러 트윈 브러쉬</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2170001334_file6_1523248839zec883ldj9.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">크레파스 </div>
                      <div className="name">크레파스_모니주(옐로우)</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2170001335_file6_1523248634tsel5la94n.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">크레파스</div>
                      <div className="name">크레파스_모니주(핑크)</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2041019049_file6_1659673523b6tw8za4y1.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">수성마카</div>
                      <div className="name">프러스펜 3000 60색 세트</div>
                    </div>
                  </a>
                </li>
              </>
            )}
            {activeCategory === "notebook" && (
              <>
                <li>
                  <a href="/product/product_view.php?idx=203&ccode=003006">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2120014201_file6_1711340757johyd13i1d.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">노트</div>
                      <div className="name">지퀀스 노트 The Color A5</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2172018015_file6_15704371548jbp9f11m5.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">풀</div>
                      <div className="name">다목적으로 사용 가능한 목공풀</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2172018017_file6_1570436926c8ouqp5opo.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">풀</div>
                      <div className="name">
                        다목적으로 사용 가능한 목공풀 2-Way
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2172018013_file6_1570436889l87efqci2x.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">풀</div>
                      <div className="name">빨리 마르는 물풀</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2172018011_file6_1570436859fjhnr74sr9.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">풀 </div>
                      <div className="name">붙였다 뗄 수 있는 메모 풀</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2172018005_file6_1570436803n3uw1ntrmc.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">풀</div>
                      <div className="name">모서리에 바르기 쉬운 삼각풀</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/product/product_view.php?idx=204&ccode=003007">
                    <div className="thum">
                      <img
                        src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2041019049_file6_1659673523b6tw8za4y1.jpg"
                        alt=""
                        width={266}
                        height={390}
                      />
                    </div>
                    <div className="info">
                      <div className="cate">수성마카</div>
                      <div className="name">프러스펜 3000 60색 세트</div>
                    </div>
                  </a>
                </li>
              </>
            )}
            {/* 다른 카테고리들에 대해서도 같은 방식으로 추가 */}
          </ul>
        </div>
        <div className="video">
          <video className="player" autoPlay muted loop>
            <source
              src="https://dfrkkcv2hg1jc.cloudfront.net/data/video/monami_brand_web_60.mp4"
              type="video/mp4"
            />
            <source
              src="https://dfrkkcv2hg1jc.cloudfront.net/data/video/monami_brand_web_60.ogv"
              type="video/ogv"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="bbs">
          <div className="conwrap">
            <div className="news">
              <div className="tit">
                <h2>MONAMI NEWS</h2>
                <a>MORE</a>
              </div>
              <ul className="news_lists">
                <li className="first">
                  <div className="thum"></div>
                  <div className="txt">
                    <img src="/img/danhwa.jpg" className="danwhapen"></img>
                    <a href="https://www.monami.com/board/board.php?bo_table=bodo&idx=186">
                      <div className="sbj">
                        모나미 X Danha 153 볼펜 세트 출시
                      </div>
                      <p>
                        "K- 아티스트 손잡고 한국의 아름다움을 알린다... 모나미 X
                        볼펜 세트 출시- 특색 있는 국내 아티스트 발굴 .."
                      </p>
                      <span className="date">2024-09-23</span>
                    </a>
                  </div>
                </li>
                <li>
                  <a>
                    - 모나미, 산업 특화형 전문 마카 ' 프로캡 드라이 펜슬 맡카 ..
                  </a>
                  <span className="date">2024-09-19</span>
                </li>
                <li>
                  <a>- 모나미, LG트윈스 팬시 굿즈 출시</a>
                  <span className="date">2024-09-09</span>
                </li>
                <li>
                  <a href="/board/board.php?bo_table=bodo&idx=180"></a>
                </li>
              </ul>
            </div>
            <div className="inquiry">
              <div className="tit">
                <img src="img/inquiry_tit_bg.png"></img>
                <h2>INQUIRY</h2>
              </div>
              <p>
                "언제나 소중한 의견에 귀 기울이겠습니다."
                <br />
                "궁금한 사항은 문의하세요"
              </p>
              <a>INQUIRY NOW</a>
            </div>
            <div className="shop">
              <div className="tit">
                <img src="img/brandstore_tit_bg.png"></img>
                <h2>모나미 네이버 브랜드스토어</h2>
              </div>
              <p>
                "모나미 공식 쇼핑몰입니다. "
                <br />
                "공식몰만의 다양한 혜택을 만나보세요"
              </p>
              <a
                href="https://brand.naver.com/monami"
                target="_blank"
                rel="noreferrer">
                BUY NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
