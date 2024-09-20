import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./paystep.css";

function PayStep({ currentStep }) {
  const StepName = [
   "장바구니", "주문결제", "주문완료"
  ];
  const StepLink = ["/shopping/cart", "/shopping/pay", "/shopping/complete"];
  let [select, setSelect] = useState(currentStep);

  const navigate = useNavigate();

  useEffect(() => {
    setSelect(currentStep);
  }, [currentStep]);
    
    const handleClick = e => {
    setSelect(e.target.value);
        navigate(`${StepLink[e.target.value]}`);
  };

  return (
    <div className="PayStepWrap">
      {StepName.map((item, index) => {
        return (
          <span key={index}>
            <button
              value={index}
              className={index == select ? "CurrentStep" : "OtherStep"}
              onClick={handleClick}
            >
              {item}
            </button>
            {/* 마지막 단계 뒤에는 >를 추가하지 않음 */}
            {index < StepName.length - 1 && <span className="StepDivider">{'>'}</span>}
          </span>
        );
      })}
    </div>
  );
}

export default PayStep;
