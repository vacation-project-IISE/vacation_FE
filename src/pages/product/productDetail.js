import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import NavBtn2 from "../../component/buttons/navBtn2";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./productDetail.css";
import Modal from "../../component/modal/modal";

function ProductDetail() {
  const { code, idx } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalImg, setModalImg] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); //로그인 확인
    setIsLogin(!!token);

    setLoading(true);
    Promise.all([fetch("/MonamiData.json"), fetch("/productDetails.json")])
      .then(async ([responseMonami, responseProductDetail]) => {
        if (!responseMonami.ok) {
          const text = await responseMonami.text();
          throw new Error(`Error fetching MonamiData.json: ${text}`);
        }
        if (!responseProductDetail.ok) {
          const text = await responseProductDetail.text();
          throw new Error(`Error fetching productDetail.json: ${text}`);
        }

        const monamiData = await responseMonami.json();
        const productDetailData = await responseProductDetail.json();

        let foundProduct = null;

        for (const key in monamiData.product) {
          if (monamiData.product.hasOwnProperty(key)) {
            const products = monamiData.product[key];
            foundProduct = products.find(product => product.idx === idx);
            if (foundProduct) break;
          }
        }

        const foundProductDetail = productDetailData.find(
          product => product.idx === idx
        );

        if (foundProduct) {
          setProductData(foundProduct);
        } else {
          setError("제품을 찾지 못했습니다");
        }

        if (foundProductDetail) {
          setProductDetail(foundProductDetail);
        } else {
          setError("제품 상세 정보를 찾지 못했습니다");
        }

        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [code, idx]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // 타 색상 이미지 출력 및 넘버링을 위해
  const images = productDetail?.images || [];
  const totalImages = images.length;

  // 이미지 List 넘기기
  const handleNextClick = () => {
    const newPosition = Math.max(scrollPosition - 100, -200);
    setScrollPosition(newPosition);
    if (listRef.current) {
      listRef.current.style.transform = `translateX(${newPosition}px)`;
    }
  };

  const handlePrevClick = () => {
    const newPosition = Math.min(scrollPosition + 100, 0);
    setScrollPosition(newPosition);
    if (listRef.current) {
      listRef.current.style.transform = `translateX(${newPosition}px)`;
    }
  };

  const handleListClick = code => {
    navigate(`/product/product_list/${code}`);
  };

  const showModal = (text, img) => {
    setModalText(text);
    setModalOpen(true);
    setModalImg(img);
  };

  const handleWishClick = () => {
    if (!isLogin) {
      showModal("로그인을 해주세요!", ""); 
      navigate("/login"); 
    } else {
      showModal("위시리스트에 담겼습니다!", "/img/heartIcon.png");
    }
  };

  const handleCartClick = () => {
    if (!isLogin) {
      showModal("로그인을 해주세요!", ""); 
      navigate("/login"); 
    } else {
      showModal("장바구니에 담겼습니다!", "/img/redCartIcon.png");
    }
  };
  const hasPrice = productDetail?.price && productDetail.price !== "";

  return (
    <div>
      <Header />
      <div className="ProductTop">
        <h2>모나미제품</h2>
        <p>모나미는 당신의 행복한 기록과 늘 함께 합니다.</p>
      </div>
      <div className="BtnBox">
        <NavBtn2 SelectedIndex={0} />
      </div>
      <h3 className="Title1">
        PRODUCT <span>INFO</span>
      </h3>
      {productData && productDetail && (
        <div className="ProductView">
          <div className="Conwrap">
            <div className="ProductInfo">
              <div className="BgArea"></div>
              <div className="Numbering">
                <span>0{currentImageIndex + 1} </span>/
                <span> 0{totalImages}</span>
              </div>
              <div className="PImg">
                <img
                  src={images[currentImageIndex]}
                  alt={productData.image_alt}
                />
                <div className="PImgList">
                  <a className="TPrev" onClick={handlePrevClick}>
                    <img src="/img/TPrev.gif" alt="PrevBtn"></img>
                  </a>
                  <div className="PImgWrap">
                    <ul ref={listRef}>
                      {images &&
                        images.map((url, index) => (
                          <li>
                            <img
                              key={index}
                              src={url}
                              alt={`PImg ${index}`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>

                  <a className="TNext" onClick={handleNextClick}>
                    <img src="/img/TNext.gif" alt="NextBtn"></img>
                  </a>
                </div>
              </div>

              <div className="ProductDetails">
                {modalOpen && (
                  <Modal
                    setModalOpen={setModalOpen}
                    text={modalText}
                    img={modalImg}
                  />
                )}
                <div className="PTop">
                  <div className="PTitle">
                    <div className="PName">{productData.name}</div>
                    <div className="PCate">{productData.category}</div>
                  </div>
                  <div className="PPrice">
                    <div>
                      {/* 가격 정보가 없으면 가격이 '구매 불가'로 뜨도록 */}
                      {productDetail.price
                        ? `${productDetail.price}원`
                        : "구매 불가"}
                    </div>
                    <div>
                      {/* 가격 정보가 없으면 위시, 장바구니 버튼이 안뜨도록 */}
                      {hasPrice && (
                        <>
                          <button className="WishBtn" onClick={handleWishClick}>
                            <img src="/img/heartIcon.png" alt="WishBtn"></img>
                            Wish
                          </button>
                          <button
                            className="CartBtn"
                            onClick={handleCartClick}>
                            <img src="/img/cartIcon.png" alt="CartBtn"></img>
                            Cart
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="PInfoList">
                  <div className="KeyFeatures">
                    <div className="tit">KEY FEATURES</div>
                    {productDetail.keyFeatures}
                  </div>
                  {/* 상세 정보가 없으면 안나타나게 */}
                  {productDetail.inkColorList &&
                    productDetail.inkColorList.length > 0 && (
                      <div className="InkColor">
                        <div className="tit">INK COLOR</div>
                        <ul>
                          {productDetail.inkColorList.map((url, index) => (
                            <li key={index}>
                              <img src={url} alt={`Ink color ${index}`} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {productDetail.bodyColorList &&
                    productDetail.bodyColorList.length > 0 && (
                      <div className="BodyColor">
                        <div className="tit">BODY COLOR</div>
                        <ul>
                          {productDetail.bodyColorList.map((url, index) => (
                            <li key={index}>
                              <img src={url} alt={`Body color ${index}`} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {productDetail.pointSize && (
                    <div className="PointSize">
                      <div className="tit">POINT SIZE</div>
                      {productDetail.pointSize}
                    </div>
                  )}
                  {productDetail.nibType &&
                    productDetail.nibType.length > 0 && (
                      <div className="NibType">
                        <div className="tit">NIB/TIB TYPE</div>
                        <ul>
                          {productDetail.nibType.map((url, index) => (
                            <li key={index}>
                              <img src={url} alt={`NibType ${index}`} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div
              className="ViewBtn"
              onClick={() => handleListClick(productData.code)}>
              <a href="">LIST</a>
            </div>
          </div>
          <div className="BtnTop" onClick={MoveToTop}>
            <img src="/img/BtnTop.gif" alt="페이지 상단으로"></img>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ProductDetail;
