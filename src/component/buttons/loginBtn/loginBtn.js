import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginBtn.css"


function LoginBtn() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    
    // 로그인 상태가 변경될 때마다 로컬스토리지에 반영
    useEffect(() => { 
      const storedLoginStatus = localStorage.getItem("isLogin"); 
      if (storedLoginStatus) { 
        setIsLogin(JSON.parse(storedLoginStatus)); 
      } 
    }, []); 


  // 로그인/로그아웃 처리 함수
  const handleLogin = () => {
    if (isLogin) {
      // 로그아웃 처리
      setIsLogin(false);
      localStorage.removeItem("userToken"); // 사용자 토큰 제거
      localStorage.setItem("isLogin", JSON.stringify(false));
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