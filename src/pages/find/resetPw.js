import Header from "../../component/header/header.js";
import "./resetPw.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ResetPw() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || ""; 
  const [inputPw, setInputPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 비밀번호 유효성 에러 메시지
  const [pwErrorMessage, setPwErrorMessage] = useState(""); // 비밀번호 확인 에러 메시지

  // 비밀번호 유효성 검증 함수
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // 비밀번호 재설정 버튼 클릭 핸들러
  const handleResetPassword = async () => {
    let hasError = false;
    const userId = localStorage.getItem("userId"); // userId 가져오기
    console.log("localStorage에서 가져온 userId:", userId); // 추가한 로그
  
    if (!userId) {
      alert("사용자 ID가 존재하지 않습니다. 다시 로그인해주세요.");
      return;
    }
  
    // 비밀번호 유효성 검증
    if (!inputPw) {
      setErrorMessage("비밀번호를 입력해주세요.");
      hasError = true;
    } else if (!validatePassword(inputPw)) {
      setErrorMessage("비밀번호는 영문, 숫자를 포함해 8자리 이상이어야 합니다.");
      hasError = true;
    } else {
      setErrorMessage("");
    }
  
    // 비밀번호 확인 값 검증
    if (!confirmPw) {
      setPwErrorMessage("비밀번호 확인을 입력해주세요.");
      hasError = true;
    } else if (inputPw !== confirmPw) {
      setPwErrorMessage("비밀번호가 일치하지 않습니다.");
      hasError = true;
    } else {
      setPwErrorMessage("");
    }
  
    if (hasError) return;
    
    try {
      const response = await fetch("http://localhost:4000/api/email/resetPW", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, newPassword: inputPw }),
      });
  
      console.log(response);
      console.log("서버 응답 코드:", response.status); // 응답 코드 확인
  
      // JSON 응답 처리
      let responseData = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      }
  
      if (response.ok) {
        alert("비밀번호가 성공적으로 재설정되었습니다!");
        navigate("/login");
      } else {
        alert(responseData?.message || "비밀번호 재설정 실패");
      }
    } catch (error) {
      console.error("비밀번호 재설정 요청 실패:", error);
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
      <div className="FindContainer">
        <div className="squareBox">
          <div className="resetPwTitle">비밀번호 재설정</div>
          <div className="resetContainer">
            {/* 새 비밀번호 입력 */}
            <div className="FindText">새 비밀번호 입력</div>
            <input
              type="password"
              placeholder="영문, 숫자 조합 8자리 이상"
              value={inputPw}
              onChange={(e) => setInputPw(e.target.value)}
            />
            <img src={"img/line.png"} alt="LineImg" />
            {errorMessage && (
              <div className="errorMessage">{errorMessage}</div>
            )}

            {/* 비밀번호 확인 입력 */}
            <div className="resetConfirmText">비밀번호 재입력</div>
            <input
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            <img src={"img/line.png"} alt="LineImg" />
            {pwErrorMessage && (
              <div className="errorMessage">{pwErrorMessage}</div>
            )}

            {/* 비밀번호 재설정 버튼 */}
            <button className="resetPwbtn" onClick={handleResetPassword}>
              비밀번호 재설정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPw;