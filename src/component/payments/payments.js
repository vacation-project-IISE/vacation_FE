import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./payments.css";

function KakaoPay({
  productName,
  totalQuantity,
  totalPrice,
  address,
  postcode,
  user_id,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    let script = document.querySelector(
      `script[src="https://cdn.iamport.kr/v1/iamport.js"]`
    );
  }, []);

  const onclickPay = (pgValue, payMethod) => {
    const { IMP } = window;
    IMP.init("imp20358665");

    // 결제 시각 계산
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월
    const day = String(currentDate.getDate()).padStart(2, "0"); // 일
    const hour = String(currentDate.getHours()).padStart(2, "0"); // 시
    const minute = String(currentDate.getMinutes()).padStart(2, "0"); // 분
    const orders_number = `${month}${day}${hour}${minute}${user_id.slice(
      0,
      2
    )}`;

    const data = {
      pg: pgValue,
      pay_method: payMethod,
      merchant_uid: orders_number,
      name: `${productName} 등 ${totalQuantity}건`,
      amount: totalPrice,
      buyer_email: user_id,
      buyer_name: user_id,
      buyer_tel: "010-0000-0000",
      buyer_addr: address,
      buyer_postcode: postcode,
      m_redirect_url: "",
    };
    IMP.request_pay(data, rsp => {
      // callback
      if (rsp.success) {
        console.log("카카오페이 결제 성공");
        console.log(data);

        // const payData = {
        //   orderID: `${Date.now()}`,
        //   productname: productName,
        //   total_price: totalPrice,
        // };

        axios
          .post("http://localhost:4000/api/order", data)
          .then(response => {
            console.log("결제 정보 전달 성공:", response.data);
            // 결제 성공 페이지로 이동
            navigate("/shopping/complete");
          })
          .catch(error => {
            console.error("결제 정보 전달 실패:", error);
          });

        navigate("/shopping/complete");
      } else {
        console.log("결제 실패");
      }
    });
  };
  // 주소 입력이 되어있지 않으면 실행이 안되게
  const isDisabled = !address || !postcode;

  // 결제 완료 시 백엔드로 데이터 전송

  return (
    <button
      onClick={() => !isDisabled && onclickPay("kakaopay.TC0ONETIME", "card")}
      className="KakaopayBtn">
      <img src="/img/kakaopayLogo.png" alt="kakaopay" />
      결제
    </button>
  );
}

export default KakaoPay;
