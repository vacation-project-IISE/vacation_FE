import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "./mypage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Mypage() {

  return (
    <div>
      <Header />
      <div>
            <div className="left-box">
                <img src="img/mypageicon.png" className="mypageicon" alt="마이페이지아이콘"></img>
                <div className="myname">
                    <p>이름</p>
                </div>
                <div className="my-email">
                    <p>Email</p>
                </div>
            </div>
            
            <div className="wishlist">
                <p>위시리스트</p>
            </div>
            
            <div className="paylist">
                <p>결제내역</p>
                <ul className="excel-paylist">
                    {/* 헤더 행 (주문번호, 상품이름, 결제금액, 처리상태) */}
                    <li className="paylist-header">
                        <span>주문번호</span>
                        <span>상품이름</span>
                        <span>결제금액</span>
                        <span>처리상태</span>
                    </li>

                    {/* 실제 데이터 행 (예시) */}
                    <li className="paylist-item">
                        <span>#12345</span>
                        <span>Product 1</span>
                        <span>₩100,000</span>
                        <span>배송 중</span>
                    </li>
                    <li className="paylist-item">
                        <span>#12346</span>
                        <span>Product 2</span>
                        <span>₩150,000</span>
                        <span>결제 완료</span>
                    </li>
                  
                </ul>
            </div>
        </div>
      <Footer />
    </div>
  );
}

export default Mypage;
