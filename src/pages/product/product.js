import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import NavBtn2 from "../../component/buttons/navBtn2";
import "./product.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
  // 카테고리별 코드로 페이지 이동
  const { code } = useParams();
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
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
        console.log("Fetched category data:", selectedCategories);

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
  }, [code]); // code가 바뀔때마다(페이지를 이동할 때마다) 데이터를 새로 불러옴

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 현재 페이지 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productData.slice(startIndex, endIndex);
  console.log("Current products:", currentProducts);
  // 전체 페이지 계산
  const totalPages = Math.ceil(productData.length / itemsPerPage);

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <button key={index}>{category}</button>
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
          {/* Render page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
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
