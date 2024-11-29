import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginBtn.css"


function LoginBtn() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    
   // 로그인 상태 초기 설정: userToken의 존재 여부로 설정
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLogin(!!token); // 토큰이 있으면 true, 없으면 false로 설정
  }, []);

  // isLogin 상태 변경 시 확인
  useEffect(() => {
    console.log("isLogin 상태:", isLogin);
  }, [isLogin]);

  // 로그인/로그아웃 처리 함수
  const handleLogin = () => {
    if (isLogin) {
      // 로그아웃 처리
      setIsLogin(false);
      localStorage.removeItem("userToken"); // 사용자 토큰 제거
    } else {
      // 로그인 페이지로 이동
      navigate("/login");
    }
  };


  return (
    <div>
      <button
        className={isLogin ? "LogoutBtn" : "LoginBtn"} // 상태에 따라 클래스 적용
        onClick={handleLogin}
      > 
        {isLogin ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
}

export default LoginBtn;