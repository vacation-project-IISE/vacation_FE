import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navBtn2.css";

function NavBtn2({ SelectedIndex }) {
  const ButtonText = [
    "프리미엄 펜",
    "펜·펜슬",
    "마카·컬러링",
    "노트·사무용품",
    "잉크·리필",
  ];
  const ButtonLink = ["005", "003", "004", "002", "001"];
  let [select, setSelect] = useState(SelectedIndex);
  // 페이지마다 초깃값을 설정해 페이지 이동 후에도
  // 선택한 버튼의 스타일이 변경될 수 있게함
  const navigate = useNavigate();

  useEffect(() => {
    // 인덱스가 다른 버튼을 통해 바뀌어도 스타일이 변경되도록 props로 받음
    setSelect(SelectedIndex);
  }, [SelectedIndex]);
    
    const handleClick = e => {
    setSelect(e.target.value);
        navigate(`/product/product_list/${ButtonLink[e.target.value]}`);
  };

  return (
    <div className="NavBtnWrap">
      {ButtonText.map((item, index) => {
        return (
          <button
            key={index}
            value={index}
            className={index == select ? "SelectedBtn" : "OtherBtn"}
            onClick={handleClick}>
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default NavBtn2;
