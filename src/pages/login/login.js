import Header from "../../component/header/header.js";
import "./login.css";
import { useState } from "react"; // 상태 관리를 위한 useState 추가
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 이메일 입력 상태
  const [password, setPassword] = useState(""); // 비밀번호 입력 상태
  const [errorMessage, setErrorMessage] = useState(""); // 로그인 실패 메시지 상태

  // 로그인 버튼 클릭 시 호출되는 함수
  const handleLoginClick = async () => {
    try {
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: email, user_pwd: password }), // email을 그대로 전송
        });

        if (response.ok) {
            // 로그인 성공 시 home으로 이동
            navigate("/");
        } else if (response.status === 401) {
            // 로그인 실패 시
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
      <img
        src={`img/monami_background.png`}
        alt="로그인 배경 이미지"
        className="background"
      />
      <div className="square-box">
        <img
          src={`img/monamiLogo.png`}
          alt="모나미 배경 이미지"
          className="monamiLogo"
        />
        <div className="input-container">
          <img src={`img/People.png`} alt="아이디 이미지" className="img-id" />
          <input
            type="text"
            placeholder="Email0000@manami.com"
            className="login-id"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 이메일 입력 상태 업데이트
          />
          <img src={"img/line.png"} alt="아이디라인" className="line1" />
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
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 상태 업데이트
          />
          <img src={"img/line.png"} alt="비번라인" className="line2" />
        </div>
        {errorMessage && ( // 오류 메시지 표시
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <img src={"img/line.png"} alt="sns라인" className="line4" />
        <img src={"img/welcome.png"} alt="상단웰컴" className="welcome" />
        <img src={"img/line3 (1).png"} alt="상단라인" className="line3" />
        <button className="login-button" onClick={handleLoginClick}>
          로그인
        </button>
        <div className="text-options">
          <a href="/signup" className="link">
            회원가입
          </a>
          <a href="/find-id" className="link">
            아이디 찾기
          </a>
          <a href="/find-password" className="link">
            비밀번호 찾기
          </a>
        </div>
        <label className="sns">SNS계정으로 로그인</label>
      </div>
    </div>
  );
}

export default Login;
