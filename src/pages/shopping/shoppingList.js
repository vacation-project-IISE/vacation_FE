import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import PayStep from "../../component/paystep/paystep";
import "./shoppingList.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ShoppingList() {
  return (
    <div>
      <Header />
      <div className="ShoppingTop">
        <h1 className="ShoppingTitle">장바구니</h1>
        <PayStep currentStep={0} />
      </div>
      <div className="ShoppingWrap">
        <div className="SelectOption">
          <div className="AllSelect">
            <input type="checkbox" id="check"></input>
            <label for="check"></label>
            <div className="OptionName">전체선택</div>
          </div>
          <div style={{ color: "#ddd", fontSize: "15px" }}>|</div>
          <div className="OptionName">선택삭제</div>
        </div>
        <div className="ShoppingContent">
          <div className="CartContent"></div>
                  <div className="PayContent">
                      <div className="PayTop">결제정보</div>
                      <ul>
                          <li>상품수</li>
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

export default ShoppingList;
