import React, { useState, useEffect } from "react";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import PayStep from "../../component/paystep/paystep";
import "./pay.css";
import { useLocation } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import KakaoPay from "../../component/payments/payments";
import axios from "axios";

function Pay() {
  const location = useLocation();
  const { selectedProducts, totalQuantity, totalPrice, quantities } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const [address, setAddress] = useState(""); // 선택한 주소
  const [zonecode, setZonecode] = useState(""); // 선택한 우편번호
  const [buildingName, setBuildingName] = useState(""); // 선택한 우편번호
  const [result, setResult] = useState(0);
  const [detailAddress, setDetailAddress] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen(true); // 모달 열림
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫힘
  };

  const handleComplete = data => {
    // 주소 선택 후 처리할 내용
    console.log(data);
    setAddress(data.address); // 주소 설정
    setZonecode(data.zonecode); // 우편번호 설정
    setBuildingName(data.buildingName);
    setIsModalOpen(false); // 모달 닫기
  };

  useEffect(() => {
    // 총 결제금액 계산
    const calculateTotalPrice = () => {
      const parsedTotalPrice = Number(totalPrice.replace(/,/g, '')); // totalPrice를 숫자로 변환
      if (!isNaN(parsedTotalPrice)) {
        const sum = parsedTotalPrice + 3000; // 3000원 추가
        setResult(sum); // 총 결제금액 설정
      } else {
        setResult(0); // totalPrice가 잘못된 경우 기본값 0
      }
    };
    calculateTotalPrice();

    if (selectedProducts && selectedProducts.length > 0) {
      const idxArray = selectedProducts.map(product => product.idx);
    }
  }, [totalPrice]); // totalPrice가 변경될 때마다 계산

  const handlePayment = () => {
    if (!address || !zonecode) {
      alert("주소를 먼저 입력해 주세요!");
    } else {
      // 결제 처리 로직, KakaoPay 컴포넌트의 onclickPay 호출
      document.querySelector(".KakaopayBtn").click();

      sendOrderData();
    }
  };

  // 백엔드로 데이터 전송하는 코드
  const user_id = localStorage.getItem("userId");
  const sendOrderData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("로그인 후 결제를 진행해 주세요!");
        return;
      }

      const response = await fetch("http://localhost:4000/api/login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("유저 정보를 받아오지 못했습니다.");
      }

      const userData = await response.json();
      const user_id = userData.user_id;

       // 제품별 수량 포함하여 주문 데이터 생성
    const productArrayWithQuantities = selectedProducts.map(product => ({
      ...product,
      quantity: quantities[product.idx] || 1, // 각 제품의 수량 포함
    }));
      
      // 주문 데이터 생성
      const orderData = {
        user_id: user_id,
        product_number:
          selectedProducts.length > 0 ? selectedProducts[0].idx : "",
        product_array:productArrayWithQuantities,
        product_amount: totalQuantity,
        total_price: result,
        user_address: `${address} ${buildingName} ${detailAddress}`,
      };

      const orderResponse = await fetch("http://localhost:4000/order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error("주문 데이터 전달에 실패했습니다");
      }

      alert("주문 데이터 전송이 완료되었습니다!");
    } catch (error) {
      console.error("데이터 전송에 실패했습니다", error);
    }
  };
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
          <div className="PayInfo">
            <div className="InfoTitle">배송 정보</div>
            <div className="RowLine"></div>

            {/* 주소 찾기 버튼과 선택한 주소 표시 */}
            <div className="AddressSection">
              <div className="AddressBox">
                <p className="AddressTitle">우편번호</p>
                <div className="SelectedAddress post">{zonecode}</div>
                <button className="AddressBtn" onClick={handleModalOpen}>
                  주소 찾기
                </button>
              </div>
              <div className="AddressBox">
                <p className="AddressTitle">주소</p>
                <div>
                  <div className="SelectedAddress">{address}</div>
                  <div className="SelectedAddress">{buildingName}</div>
                  <input
                    className="SelectedAddress"
                    placeholder="상세 주소를 입력해주세요."
                    value={detailAddress}
                    onChange={e => setDetailAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 주소 찾기 모달 */}
            {isModalOpen && (
              <div className="ModalOverlay">
                <div className="ModalContent">
                  <button className="CloseBtn" onClick={handleModalClose}>
                    X
                  </button>
                  <DaumPostcode onComplete={handleComplete} />
                </div>
              </div>
            )}
          </div>
          <div className="PayConfirm">
            <div className="PayTop">주문상품 {totalQuantity}개</div>
            <div className="PayProduct">
              {selectedProducts.length > 0 ? (
                selectedProducts.map(product => (
                  <div key={product.idx} className="ProductBox">
                    <div>{product.name}</div>
                    <div>
                      {parseInt(
                        product.price.replace("원", ""),
                        10
                      ).toLocaleString()}{" "}
                      원
                    </div>
                  </div>
                ))
              ) : (
                <div>장바구니에 상품이 없습니다.</div>
              )}
            </div>
            <div className="Paymenu">
              <ul>
                <li>상품금액</li>
                <li>배송비</li>
              </ul>
              <div className="PayDetails">
                <ul>
                  <li>{totalPrice}원</li>
                  <li>3,000원</li>
                </ul>
              </div>
            </div>
            <div className="PayBottom">
              총 결제금액 <div>{result.toLocaleString()}원</div>
            </div>

            <div className="PayBtnWrap">
              카톡 하나로 결제 끝<br></br>카카오페이
              <button className="PayBtn" onClick={handlePayment}>
                <KakaoPay
                  productName={
                    selectedProducts.length > 0 ? selectedProducts[0].name : ""
                  }
                  totalQuantity={totalQuantity}
                  totalPrice={result}
                  address={`${address} ${buildingName} ${detailAddress}`}
                  postcode={zonecode}
                  user_id={user_id}
                  product_array={selectedProducts}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Pay;
