import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import PayStep from "../../component/paystep/paystep";
import "./pay.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Pay() {
  return (
    <div>
      <Header />
      <div className="ShoppingTop">
        <h1 className="ShoppingTitle">주문결제</h1>
        <div className="PayStep">
          <PayStep currentStep={1} />
        </div>
      </div>
      <div className="PayWrap">
        <div className="ShoppingContent">
          <div className="PayInfo"></div>
          <div className="PayConfirm">
                      <div className="PayTop">주문상품 n개</div>
                      <div className="PayProduct">여기에 상품 정보</div>
            <ul>
              <li>상품금액</li>
              <li>배송비</li>
            </ul>
            <div className="PayBottom">총 결제금액</div>
            <button className="PayBtn">구매하기</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pay;
