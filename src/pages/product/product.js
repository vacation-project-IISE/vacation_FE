import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import NavBtn2 from "../../component/buttons/navBtn2";
import "./product.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
  // 카테고리별 코드로 페이지 이동
  const { code, idx } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 페이지별로 상품 및 카테고리가 같이 변화하도록
  const getCategoryByCode = (code, data) => {
    switch (code) {
      case "005":
        return data.category.data1;
      case "003":
        return data.category.data2;
      case "004":
        return data.category.data3;
      case "002":
        return data.category.data4;
      case "001":
        return data.category.data5;
      default:
        return [];
    }
  };

  // 카테고리 이름과 같지 않아도 포함되는 제품을 출력할 수 있도록 매핑
  const categoryMapping = {
    고급볼펜: ["프리미엄펜", "프리미엄 펜"],
    수성펜: ["사인펜", "수성마카", "수성 마카"],
    "연필·샤프": ["샤프", "샤프/샤프심", "연필"],
    생활마카: ["마카", "보드마카", "유성매직", "유성매직 트윈 109"],
    "컬러링·브러쉬펜": ["워터브러쉬", "수성마카", "수성펜"],
    "색연필·물감": [
      "모니주 어린이 문구 선물세트",
      "크레파스",
      "색연필",
      "샤프식 색연필",
      "그림물감",
    ],
    "LOBDA(롭다)": ["사무용품"],
    "노트·다이어리": ["노트"],
    "풀·접착용품": ["풀"],
    "지우개·수정용품": ["수정테이프", "기타"],
    "볼펜 리필": ["수성펜", "유성볼펜", "FX700", "프리미엄펜"],
    병잉크: ["수성마카", "만년필"],
  };

  const inkCartridgeProducts = ["잉크 카트리지"];
  const converterProduct = ["모나미 컨버터"];

  useEffect(() => {
    fetch("/MonamiData.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("데이터를 로드하지 못했습니다");
        }
        return response.json();
      })
      .then(data => {
        // 디버깅을 위한 코드: code에 따른 카테고리 설정과 데이터 fetch 확인
        const selectedCategories = getCategoryByCode(code, data);
        setCategoryData(selectedCategories);
        // console.log("Fetched category data:", selectedCategories);

        let foundProducts = [];

        // 페이지와 같은 code를 가진 제품을 필터링해서 페이지별 상품 출력
        for (const key in data.product) {
          if (data.product.hasOwnProperty(key)) {
            const products = data.product[key];
            const matchingProducts = products.filter(
              product => product.code === code
            );
            foundProducts = [...foundProducts, ...matchingProducts];
          }
        }

        if (foundProducts.length > 0) {
          setProductData(foundProducts);
        } else {
          setError("제품을 찾지 못했습니다");
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    // 카테고리 필터와 페이지 리셋
    // 리셋을 안하면 해당 정보가 다른 코드에도 그대로 넘겨져서 다른 제품을 보여줄 수 없음!!
    setSelectedCategory(null);
    setCurrentPage(1);
  }, [code]); // code가 바뀔때마다(페이지를 이동할 때마다) 데이터를 새로 불러옴

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  // 카테고리 선택 시 필터
  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  // 카테고리 선택시 필터링
  const filteredProducts = selectedCategory
    ? productData.filter(product => {
        const categoryGroup = categoryMapping[selectedCategory] || [
          selectedCategory,
        ];

        // 잉크 카트리지 제품 필터링되게
        if (
          selectedCategory === "잉크 카트리지" &&
          inkCartridgeProducts.includes(product.name)
        ) {
          return true;
        }
        // 컨버터 제품 필터링 되게
        if (
          selectedCategory === "컨버터" &&
          converterProduct.includes(product.name)
        ) {
          return true;
        }
        return categoryGroup.includes(product.category);
      })
    : productData;

  // 현재 페이지 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  // 전체 페이지 계산
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const GotoDetail = (idx) => {
    navigate(`/product/product_view/${idx}`);
  }
  return (
    <div className="ProductPage">
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

      <div className="CategoryBtn">
        {categoryData.length > 0 ? (
          categoryData.map((category, index) => (
            <button
              onClick={() => handleCategoryClick(category)}
              className={selectedCategory === category ? "ActiveCategory" : ""}>
              {category}
            </button>
          ))
        ) : (
          <p>카테고리를 찾을 수 없습니다.</p>
        )}
      </div>
      <div className="ProductWrap">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <div className="ProductBox" key={index}>
              <img src={product.image_url} alt={product.image_alt} />
              <div className="Ondiv"  onClick={()=>GotoDetail(product.idx, product.code)}>
                <div className="BtnPlus">
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="ProductInfo">
                <p className="ProductCategory">{product.category}</p>
                <p className="Productname">{product.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>제품 정보를 찾을 수 없습니다.</p>
        )}
      </div>
      <div className="Paging">
        <a
          className="PagePrev"
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }>
          <img src="/img/PagePrev.gif" alt="PagePrev" />
        </a>
        <strong>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </strong>
        <a
          className="PageNext"
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }>
          <img src="/img/PageNext.gif" alt="PageNext" />
        </a>
      </div>
      <div className="BtnTop" onClick={MoveToTop}>
        <img src="/img/BtnTop.gif" alt="페이지 상단으로"></img>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
