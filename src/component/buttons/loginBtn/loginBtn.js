import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginBtn.css";

function LoginBtn() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // 로그인 상태 초기 설정: token의 존재 여부로 설정
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token); // 토큰이 있으면 true, 없으면 false로 설정
  }, []);

  // 로그인/로그아웃 처리 함수
  const handleLogin = () => {
    if (isLogin) {
      // 로그아웃 처리
      setIsLogin(false);
      localStorage.removeItem("token"); // 사용자 토큰 제거
      localStorage.removeItem("userId");
      localStorage.removeItem("token_expiry");
    } else {
      // 로그인 페이지로 이동
      navigate("/login");
    }
  };

  // 마이페이지로 이동하는 함수
  const handleMypage = () => {
    navigate("/mypage");
  };

  return (
    <div>
      {isLogin ? (
        <div className="BlackBtns">
          <button onClick={handleLogin} className="LogoutBtn">
            로그아웃
          </button>
          <button className="MypageBtn" onClick={handleMypage}>
            마이페이지
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="LoginBtn">
          로그인
        </button>
      )}
    </div>
  );
}

export default LoginBtn;


