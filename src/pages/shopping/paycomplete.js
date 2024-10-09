import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import PayStep from "../../component/paystep/paystep";
import "./paycomplete.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PayComplete() {
    const navigate = useNavigate()
    const GoToProduct = () => {
        navigate("/product/product_list/005")
    }
  return (
    <div>
      <Header />
      <div className="ShoppingTop">
        <h1 className="ShoppingTitle">주문완료</h1>
        <div className="PayStep">
          <PayStep currentStep={2} />
        </div>
      </div>
      <div className="CompleteWrap">
        <div className="CompleteBox">
          <div className="CompleteContent">
            <img src="/img/complete.png"></img>
            <div className="CompleteText">
              <div style={{marginRight:"10px"}}>주문이</div>
              <span>완료</span>
              <div>되었습니다!</div>
            </div>
                      <div className="CompleteBtnWrap">
                          <button>주문 상세보기</button>
                          <button onClick={GoToProduct}>계속 쇼핑하기</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PayComplete;
