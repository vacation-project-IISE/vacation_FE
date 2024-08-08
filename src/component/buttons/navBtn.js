import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navBtn.css"


function NavBtn({ SelectedIndex }) {
    const ButtonText = ["CEO 메시지", "회사정보", "회사연혁", "윤리강령", "찾아오시는 길"]
    const ButtonLink = ["/ceo", "/company", "/history","/conduct", "/location"]
    let [select, setSelect] = useState(SelectedIndex);
    // 페이지마다 초깃값을 설정해 페이지 이동 후에도
    // 선택한 버튼의 스타일이 변경될 수 있게함
    const navigate = useNavigate();

    const handleClick = (e) => {
        setSelect(e.target.value);
        navigate(`/about${ButtonLink[e.target.value]}`);
    };

  return (
      <div className="NavBtnWrap">
          {ButtonText.map((item, index) => {
              return (
                  <button key={index} value={index}
                      className={index == select ? "SelectedBtn" : "OtherBtn"}
                      onClick={handleClick}
                  >{item}</button>
              )
          })}

        </div>
  );
}

export default NavBtn;

// function NavBtn() {
//     return (
//         <div className="NavBtnWrap">
//             <button>CEO 메시지</button>
//             <button>회사정보</button>
//             <button>회사연혁</button>
//             <button>윤리강령</button>
//             <button>찾아오시는 길</button>
//        </div>
//     )
// }

// export default NavBtn;