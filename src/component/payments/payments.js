import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./payments.css";

function KakaoPay({ productName, totalQuantity, totalPrice, address, postcode }) {
  const navigate = useNavigate();
  useEffect(() => {
    let script = document.querySelector(
      `script[src="https://cdn.iamport.kr/v1/iamport.js"]`
    );
  }, []);

  const onclickPay = (pgValue, payMethod) => {
    const { IMP } = window;
    IMP.init("imp20358665");

    const data = {
      // param
      pg: pgValue,
      pay_method: payMethod, // card
      merchant_uid: `${Date.now()}`,
      name: `${productName} 등 ${totalQuantity}건`,
      amount: totalPrice,
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-0000-0000",
      buyer_addr: address,
      buyer_postcode:postcode,
      m_redirect_url: "",
    };
    IMP.request_pay(data, rsp => {
      // callback
      if (rsp.success) {
        console.log("결제 성공");
        console.log(data);
        navigate('/shopping/complete');
      } else {
        console.log("결제 실패");
      }
    });
  };
  // 주소 입력이 되어있지 않으면 실행이 안되게
  const isDisabled = !address || !postcode;
  return (
    <button
    onClick={() => !isDisabled && onclickPay("kakaopay.TC0ONETIME", "card")}
    className="KakaopayBtn"
  >
    <img src="/img/kakaopayLogo.png" alt="kakaopay" />
    결제
  </button>
  );
}

export default KakaoPay;
