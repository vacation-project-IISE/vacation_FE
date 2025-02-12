import Header from "../../component/header/header.js";
import "./login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  
  // 자동 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("token_expiry");
    setIsLogin(false);
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    navigate("/login");
  };
  

  // 로그인 버튼 클릭 시 호출되는 함수
  const handleLoginClick = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, user_pwd: password }),
      });

      console.log("서버 응답 코드:", response.status); // 응답 코드 확인

      if (response.ok) {
        // 응답 본문에서 토큰 추출
        const data = await response.json(); // 응답 본문 파싱
        const user_id = userId; // `user_id`를 가져옴
        const token = data.token; // 백엔드에서 전달된 토큰 (키 이름 확인 필요)


        if (token && user_id) {
          const expiryTime = Date.now() + 360000;
          localStorage.setItem("token", token); // 토큰 저장
          localStorage.setItem("userId", user_id); // user_id 저장
          localStorage.setItem("token_expiry", expiryTime.toString());
          console.log("로그인 성공: 토큰과 user_id 저장됨");
          setIsLogin(true);
          alert("로그인 성공!");
          navigate("/"); // 홈으로 이동
          setTimeout(() => handleLogout(), 360000);
        } else {
          console.error("로그인 성공했지만 토큰 또는 user_id 없음");
          alert("로그인에 문제가 발생했습니다. 다시 시도해주세요.");
        }
      } else if (response.status === 401) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      } else {
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      setErrorMessage("서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <div>
      <Header />
     
      <div className="square-box">
        <img
          src={`img/monamiLogo.png`}
          alt="모나미 배경 이미지"
          className="monamiLogo"
        />
        <div className="input-container">
          <div className="IdContainer">
            <div className="Inputcontainer">
          <img src={`img/People.png`} alt="아이디 이미지" className="img-id" />
          <input
            type="text"
            placeholder="ID"
            className="login-id"
            value={userId}
            onChange={e => setUserId(e.target.value)} // 이메일 입력 상태 업데이트
          />
          </div>
          <img src={"img/line.png"} alt="아이디라인" className="line1" />
          </div>
         <div className="PwContainer">
          <div className="Inputcontainer">
          <img
            src={`img/Password.png`}
            alt="비번이미지"
            className="img-password"
          />
          <input
            type="password"
            placeholder="Password"
            className="login-pw"
            value={password}
            onChange={e => setPassword(e.target.value)} // 비밀번호 입력 상태 업데이트
          />
          </div>
          <img src={"img/line.png"} alt="비번라인" className="line2" />
          </div>
        </div>
        {errorMessage && ( // 오류 메시지 표시
          <div className="error-message">{errorMessage}</div>
        )}
        <img src={"img/welcome.png"} alt="상단웰컴" className="welcome" />
        <img src={"img/line3 (1).png"} alt="상단라인" className="line3" />
        <button className="login-button" onClick={handleLoginClick}>
          로그인
        </button>
        <div className="text-options">
          <a href="/signup" className="link">
            회원가입
          </a>
          <a href="/findIdPw" className="link">
            아이디 / 비밀번호 찾기
          </a>
        </div>
      </div>
      <img
        src={`img/monami_background.png`}
        alt="로그인 배경 이미지"
        className="background"
      />
    </div>
  );
}

export default Login;
