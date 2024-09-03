import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import NavBtn2 from "../../component/buttons/navBtn2";
import "./product.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
  // 카테고리별 코드로 페이지 이동
    const { code } = useParams();
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        console.log("Current code from URL:", code);
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

                let foundProducts = [];
                
            // code에 따라 제품 찾기
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                  const products = data[key];
                  // Filter products that match the code
                  const matchingProducts = products.filter((product) => product.code === code);
                  foundProducts = [...foundProducts, ...matchingProducts];
                }
              }
                  // 디버깅을 위한 코드: 데이터 find 확인
                  console.log("Found product:", foundProducts);
                
                  if (foundProducts) {
                    setProductData(foundProducts);
                  
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
          {productData.length > 0 ? (
          productData.map((product, index) => (
            <div key={index}>
              <h1>{product.name}</h1>
              <img src={product.image_url} alt={product.image_alt} />
            </div>
          ))
        ) : (
          <p>Product data not found.</p>
      )}
    </div>
      <Footer />
    </div>
  );
}

export default Product;
