import Header from "../../component/header/header.js";
import "./home.css";

function Home() {
  return (
    <div>
      <Header />
      <img src="img/hometop.jpg" className="home-top" alt="Home Top Image" />
      
      <div className="new">
        <h2>NEW <br /> ARRIVALS</h2>
        <p>가장 먼저 만나는 설레는 기다림</p>
      </div>

      <div className="newarrival">
        <img src="img/zpen.jpg" className="home-zpen" alt="Z Pen" />
        <img src="img/pluspen.jpg" className="home-pluspen" alt="Plus Pen" />
        <img src="img/note.jpg" className="home-note" alt="Note" />
        <img src="img/153pen.jpg" className="home-153pen" alt="153 Pen" />
        <img src="img/pluspen2.jpg" className="home-pluspen2" alt="Plus Pen 2" />
      </div>

      <div className="home-box2">
        <div className="tit">Best Product</div>
        <p className="tit_btn">언제 어디서나 함께하는 모나미</p>

        <div className="p_tabs">
          <ul>
            <li className="on"><a>프리미엄 펜</a></li>
            <li><a>펜-펜슬</a></li>
            <li><a>마카-컬러링</a></li>
            <li><a>노트-사무용품</a></li>
          </ul>
        </div>
        
        <div className="p_lists">
                        <ul className="wrapper_ul">
                            <li>
                                <img src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040136001_file6_1713138750ujw6qaj97g.jpg" alt width={266} height={390}></img>
                                <a>프리미엄 펜</a>
                                <a> 프러스펜 3000프라임</a>
                            </li>
                            <li>
                                <img src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/8801067962537_file6_16993368522ze8t9y6ul.jpg" alt width={266} height={390}></img>
                                <a>프리미엄 펜</a>
                                <a> 153 리스펙트 리파인</a>
                            </li>
                            <li>
                                <img src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040048020_file6_1681086837wink3y4zfr.jpg" alt width={266} height={390}></img>
                                <a>만년필</a>
                                <a> 153 아이디 만년필</a>
                            </li>
                            <li>
                                <img src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040048012_file6_1583298386d4wy0fw22t.jpg" alt width={266} height={390}></img>
                                <a>만년필</a>
                                <a> 153 네오 만년필 EF</a>
                            </li>
                            <li>
                                <img src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040048012_file6_1583298386d4wy0fw22t.jpg" alt width={266} height={390}></img>
                                <a>프리미엄펜</a>
                                <a> 153 블랙 & 화이트</a>
                            </li>
                            <li>
                                <img src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040048012_file6_1583298386d4wy0fw22t.jpg" alt width={266} height={390}></img>
                                <a>프리미엄펜</a>
                                <a> 153 골드</a>
                            </li>
                            <li>
                                <img src="https://dfrkkcv2hg1jc.cloudfront.net/data/product/2040048012_file6_1583298386d4wy0fw22t.jpg" alt width={266} height={390}></img>
                                <a>프리미엄펜</a>
                                <a> 153 네오 만년필 EF</a>
                            </li>
                        </ul>
                    </div>
        <div className="video">
          <video className="player" autoPlay muted loop>
            <source src="https://dfrkkcv2hg1jc.cloudfront.net/data/video/monami_brand_web_60.mp4" type="video/mp4" />
            <source src="https://dfrkkcv2hg1jc.cloudfront.net/data/video/monami_brand_web_60.ogv" type="video/ogv" />
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
                                <img src="img/danwha.jpg" className="danwhapen"></img>
                             <a href="https://www.monami.com/board/board.php?bo_table=bodo&idx=186">
                             <div className="sbj">모나미 X Danha 153 볼펜 세트 출시</div>
                             <p>
                                "K- 아티스트 손잡고 한국의 아름다움을 알린다... 모나미 X 볼펜 세트 출시- 특색 있는 국내 아티스트 발굴 .."
                             </p>
                             <span className="date">2024-09-23</span>
                             </a>
                            </div>
                        </li>
                        <li>
                            <a href="/board/board.php?bo_table=bodo&idx=182">- 모나미, 산업 특화형 전문 마카 ' 프로캡 드라이 펜슬 맡카 ..</a>
                            <span className="date">2024-09-19</span>
                        </li>
                        <li>
                            <a href="/board/board.php?bo_table=bodo&idx=181">- 모나미, LG트윈스 팬시 굿즈 출시</a>
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
                        <br/>
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
                    <br/>
                    "공식몰만의 다양한 혜택을 만나보세요"
                </p>
                <a href="https://brand.naver.com/monami" target="_blank">BUY NOW</a>
                </div>
               
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
