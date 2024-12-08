import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "./mypage.css";
import { useState, useEffect } from "react";

function Mypage() {
  // 위시리스트 항목을 저장하는 상태
  const [wishlistItems, setWishlistItems] = useState([]);
  // const [wishlistItems, setWishlistItems] = useState([
  //   "img/wishlist-item1.jpg",
  //   "img/wishlist-item2.jpg",
  //   "img/wishlist-item3.jpg",
  //   "img/wishlist-item4.jpg",
  //   "img/wishlist-item5.jpg",
  //   // 필요한 만큼 항목 추가
  // ]);
  // 결제 내역 데이터
  const paylistData = [
    {
      orderNo: "#12345",
      productName: "상품 1",
      price: "₩100,000",
      status: "배송 중",
    },
    {
      orderNo: "#12346",
      productName: "상품 2",
      price: "₩150,000",
      status: "결제 완료",
    },
    // 추가 데이터 행을 여기에 추가할 수 있습니다.
  ];

  const user_id = localStorage.getItem("username");
  useEffect(() => {
    const token = localStorage.getItem("userToken");
  
    console.log(token, user_id)
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }
  
    fetch("http://localhost:4000/api/wish", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ user_id }), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 응답이 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setWishlistItems(data);
      })
      .catch((error) => {
        console.error("위시리스트 데이터 로드 실패:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="MyPageWrap">
        <div className="left-box">
          <img
            src="img/mypageicon.png"
            className="mypageicon"
            alt="마이페이지아이콘"
          />
          <div className="myname">
            <p>사용자 이름</p>
          </div>
          <div className="my-email">
            <p>{user_id}</p>
          </div>
        </div>

        <div className="MyPageContent">
          {/* 위시리스트 섹션 */}
          <div className="wishlist">
            <h1>위시리스트</h1>
            <ul className="wishlist-row">
              {wishlistItems.map((item, index) => (
                <li key={index}>
                  <img src={item} alt={`위시리스트 항목 ${index + 1}`} />
                  <p>상품 {index + 1}</p> {/* 상품 이름 추가 */}
                </li>
              ))}
            </ul>
          </div>

          {/* 결제 내역 섹션 */}
          <div className="paylist">
            <h1>결제 내역</h1>
            <ul className="paylist-table">
              <li className="paylist-header">
                <span>주문번호</span>
                <span>상품 이름</span>
                <span>결제 금액</span>
                <span>처리 상태</span>
              </li>
              {paylistData.map((item, index) => (
                <li className="paylist-item" key={index}>
                  <span>{item.orderNo}</span>
                  <span>{item.productName}</span>
                  <span>{item.price}</span>
                  <span>{item.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Mypage;
