import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "./mypage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Mypage() {
  const { code, idx } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

 

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

 
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const GotoDetail = idx => {
    navigate(`/product/product_view/${idx}`);
  };

  return (
    <div>
      <Header />
      
      <Footer />
    </div>
  );
}

export default Mypage;
