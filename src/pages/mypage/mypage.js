import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "./mypage.css";
import { useState } from "react";

function Mypage() {
  // 위시리스트 항목을 저장하는 상태
  const [wishlistItems, setWishlistItems] = useState([
    "img/wishlist-item1.jpg",
    "img/wishlist-item2.jpg",
    "img/wishlist-item3.jpg",
    "img/wishlist-item4.jpg",
    "img/wishlist-item5.jpg",
    // 필요한 만큼 항목 추가
  ]);

  // 결제 내역 데이터
  const paylistData = [
    { orderNo: "#12345", productName: "상품 1", price: "₩100,000", status: "배송 중" },
    { orderNo: "#12346", productName: "상품 2", price: "₩150,000", status: "결제 완료" },
    // 추가 데이터 행을 여기에 추가할 수 있습니다.
    
  ];

  return (
    <div>
      <Header />
      <div className="MyPageWrap">
        <div className="left-box">
          <img src="img/mypageicon.png" className="mypageicon" alt="마이페이지아이콘" />
          <div className="myname">
            <p>사용자 이름</p>
          </div>
          <div className="my-email">
            <p>사용자 이메일</p>
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


// import Header from "../../component/header/header";
// import Footer from "../../component/footer/footer";
// import "./mypage.css";
// import { useState, useEffect } from "react";
// import axios from "axios";

// function Mypage() {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [paylistData, setPaylistData] = useState([]);

//   useEffect(() => {
//     // wishlist.json에서 데이터 가져오기
//     axios.get("/data/wishlist.json")
//       .then(response => setWishlistItems(response.data))
//       .catch(error => console.error("위시리스트 데이터 로드 실패:", error));

//     // paylist.json에서 데이터 가져오기
//     axios.get("/data/paylist.json")
//       .then(response => setPaylistData(response.data))
//       .catch(error => console.error("결제 내역 데이터 로드 실패:", error));
//   }, []);

//   return (
//     <div>
//       <Header />
//       <div className="MyPageWrap">
//         <div className="left-box">
//           <img src="img/mypageicon.png" className="mypageicon" alt="마이페이지아이콘" />
//           <div className="myname">
//             <p>사용자 이름</p>
//           </div>
//           <div className="my-email">
//             <p>사용자 이메일</p>
//           </div>
//         </div>

//         <div className="MyPageContent">
//           {/* 위시리스트 섹션 */}
//           <div className="wishlist">
//             <h1>위시리스트</h1>
//             <ul className="wishlist-row">
//               {wishlistItems.map((item, index) => (
//                 <li key={index}>
//                   <img src={item.imageUrl} alt={`위시리스트 항목 ${index + 1}`} />
//                   <p>{item.name}</p> {/* 상품 이름을 동적으로 추가 */}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* 결제 내역 섹션 */}
//           <div className="paylist">
//             <h1>결제 내역</h1>
//             <ul className="paylist-table">
//               <li className="paylist-header">
//                 <span>주문번호</span>
//                 <span>상품 이름</span>
//                 <span>결제 금액</span>
//                 <span>처리 상태</span>
//               </li>
//               {paylistData.map((item, index) => (
//                 <li className="paylist-item" key={index}>
//                   <span>{item.orderNo}</span>
//                   <span>{item.productName}</span>
//                   <span>{item.price}</span>
//                   <span>{item.status}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Mypage;
