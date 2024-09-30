import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "./search.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Search() {
  const { code, idx } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState(""); // 검색어 상태값
  const [filteredProducts, setFilteredProducts] = useState([]); // 검색된 결과 저장 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    
    fetch("/MonamiData.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("데이터를 로드하지 못했습니다");
        }
        return response.json();
      })
      .then(data => {
        let foundProducts = [];

        // 모든 제품을 가져오기
        for (const key in data.product) {
          if (data.product.hasOwnProperty(key)) {
            const products = data.product[key];
            foundProducts = [...foundProducts, ...products]; // 필터링하지 않고 모든 제품을 가져옴
          }
        }

        if (foundProducts.length > 0) {
          setProductData(foundProducts);
          setFilteredProducts(foundProducts); // 초기에는 전체 제품을 표시
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

    setCurrentPage(1);
  }, []);

  const handleSearch = () => {
    // 검색어로 필터링된 제품 목록
    const newFilteredProducts = productData.filter(
      product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); // 검색 후 페이지를 첫 페이지로 초기화
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch(); // 엔터키를 누르면 검색 실행
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  // 현재 페이지 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // 전체 페이지 계산
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const GotoDetail = idx => {
    navigate(`/product/product_view/${idx}`);
  };

  return (
    <div>
      <Header />
      <div className="ProductTop">
        <h2>모나미제품</h2>
        <p>모나미는 당신의 행복한 기록과 늘 함께 합니다.</p>
      </div>
      <h3 className="Title1" style={{ marginTop: "10px" }}>
        PRODUCT <span>DETAIL SEARCH</span>
      </h3>
      <div className="SearchWrap">
        <div className="SearchBar">
          <div className="Clear">
            <div className="Tit">
              <div className="Kr">상품검색</div>
              <div className="En">Product detail search</div>
            </div>
            <div className="SearchContent">
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                value={searchText}
                onChange={e => setSearchText(e.target.value)} // 검색어 업데이트
                onKeyDown={handleKeyDown} // 엔터키 감지
              />
              <button onClick={handleSearch}>SEARCH</button> {/* 버튼 클릭 시 검색 */}
            </div>
          </div>
        </div>
        <div className="Total">
          총 <span>{filteredProducts.length}</span>개의 상품이 검색되었습니다.
        </div>
        <div className="ProductList">
          <ul>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <li className="ProductBox" key={index}>
                  <img src={product.image_url} alt={product.image_alt} />
                  <div
                    className="Ondiv"
                    onClick={() => GotoDetail(product.idx, product.code)}
                  >
                    <div className="BtnPlus">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  <div className="ProductInfo">
                    <p className="ProductCategory">{product.category}</p>
                    <p className="Productname">{product.name}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>제품 정보를 찾을 수 없습니다.</p>
            )}
          </ul>
          <div className="Paging">
            <a
              className="PagePrev"
              onClick={() =>
                handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
              }
            >
              <img src="/img/PagePrev.gif" alt="PagePrev" />
            </a>
            <strong>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => handlePageChange(index + 1)}
                >
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
              }
            >
              <img src="/img/PageNext.gif" alt="PageNext" />
            </a>
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

export default Search;
