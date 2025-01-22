import Header from "../../component/header/header.js";
import "./resetPw.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPw() {
  const navigate = useNavigate();
  const [inputPw, setInputPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 비밀번호 유효성 에러 메시지
  const [PwErrorMessage, setPwErrorMessage] = useState(""); // 비밀번호 확인 에러 메시지

  // 비밀번호 유효성 검증 함수
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // 비밀번호 재설정 버튼 클릭 핸들러
  const handleResetPassword = () => {
    // 비밀번호 유효성 검증
    if (!validatePassword(inputPw)) {
      setErrorMessage("영문, 숫자를 포함해 8자리 이상을 입력해주세요.");
      setPwErrorMessage(""); // 비밀번호 확인 에러 초기화
      return;
    }

    // 비밀번호 확인 값 검증
    if (inputPw !== confirmPw) {
      setPwErrorMessage("비밀번호를 다시 확인해주세요.");
      setErrorMessage(""); // 유효성 에러 초기화
      return;
    }

    // 에러 메시지 초기화
    setErrorMessage("");
    setPwErrorMessage("");

    // 성공 알림 및 리다이렉트
    alert("비밀번호가 성공적으로 재설정되었습니다!");

    // 여기에 백엔드 연결 코드 써야함 !!

    
    navigate("/login");
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
            {PwErrorMessage && (
              <div className="errorMessage">{PwErrorMessage}</div>
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

