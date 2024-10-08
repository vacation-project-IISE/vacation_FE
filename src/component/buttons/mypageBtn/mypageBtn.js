import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mypageBtn.css";

function MypageBtn() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // For testing, hardcode it to true

  // 로그인 상태가 변경될 때마다 로컬스토리지에 반영
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLogin");
    if (storedLoginStatus) {
      setIsLogin(JSON.parse(storedLoginStatus));
    }
  }, []);

  useEffect(() => {
      localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);

  // 로그인/로그아웃 처리 함수
    const handleMypage = () => {
        navigate("/mypage");
    // if (isLogin) {
    //   // 로그인이 되어있으면 마이페이지로 이동
    //   navigate("/mypage");
    // } else {
    //   // 로그인 되어있지 않으면 경고창 띄우고 로그인 페이지로 이동
    //   alert("로그인 후 이용해주세요!");
    //   navigate("/login");
    // }
  };

  return (
    <div>
      <button className="MypageBtn" onClick={handleMypage}>
        마이페이지
      </button>
    </div>
  );
}

export default MypageBtn;
