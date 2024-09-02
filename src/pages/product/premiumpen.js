import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import NavBtn2 from "../../component/buttons/navBtn2";
import "./product.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PremiumPen() {
  // 카테고리별 코드로 페이지 이동
    const { code } = useParams();
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        fetch("/MonamiData.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error("데이터를 로드하지 못했습니다");
            }
            return response.json();
          })
            .then((data) => {
                // 디버깅을 위한 코드: 데이터 fetch 확인
                console.log("Fetched data:", data); 
                console.log("Current code from URL:", code);

            // 코드에 따라 제품 찾기
              const productKey = Object.keys(data).find(
                  (key) => data[key].code === code
                );
                  // 디버깅을 위한 코드: 데이터 find 확인
                console.log("Found product key:", productKey);
                
            if (productKey) {
                setProductData(data[productKey]);

                // 디버깅을 위한 코드: set 데이터 확인
                console.log("Product data set:", data[productKey]);
            } else {
              setError("제품을 찾지 못했습니다");
            }
            setLoading(false);
          })
          .catch((error) => {
              setError(error.message);
              console.error("Error fetching data:", error);
            setLoading(false);
          });
      }, [code]); // 코드가 바뀔 때마다 실행
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
    
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
          <div>
      {productData ? (
        <div>
          <h1>{productData.name}</h1>
          <img src={productData.image_url} alt={productData.image_alt} />
        </div>
      ) : (
        <p>Product data not found.</p>
      )}
    </div>
      <Footer />
    </div>
  );
}

export default PremiumPen;
