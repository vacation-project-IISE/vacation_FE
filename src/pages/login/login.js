import Header from "../../component/header/header.js";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { signIn } from "../../firebase/auth.js";
// import { db } from '../../firebase/auth.js';
// import { getDoc, doc } from 'firebase/firestore';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  // 로그인 버튼 클릭 시 호출되는 함수
  // const handleLoginClick = async () => {
  //   if (!email || !password) {
  //     setErrorMessage("이메일과 비밀번호를 모두 입력해주세요.");
  //     return;
  //   }
  //   console.log("이메일:", email);  // 이메일 출력
  //   console.log("비밀번호:", password);  // 비밀번호 출력
  //   try {
  //     // Firebase의 signIn 함수를 호출하여 이메일과 비밀번호로 로그인
  //     const user = await signIn(email, password);

  //     if (user) {
  //       // 로그인 성공 후 Firestore에서 사용자 추가 정보 가져오기
  //       const userDoc = await getUserDataFromFirestore(user.uid);
  //       console.log("사용자 정보:", userDoc);

  //       // 로그인 성공 시, 사용자의 정보가 반환되면 홈으로 이동
  //       navigate("/"); // 홈으로 이동
  //     }
  //   } catch (error) {
  //     console.error("로그인 실패:", error.message);
  //     setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다."); // 로그인 실패 시 메시지

  //     if (error.code === "auth/invalid-credential") {
  //       setErrorMessage("잘못된 자격 증명입니다. 이메일과 비밀번호를 확인해주세요.");
  //     }
  //   }
    
  // };

  //  // Firestore에서 사용자 데이터 가져오기
  //  const getUserDataFromFirestore = async (uid) => {
  //   const docRef = doc(db, "users", uid);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     return docSnap.data();
  //   } else {
  //     console.error("사용자 정보가 Firestore에 없습니다.");
  //     return null;
  //   }
  // };
  
// 로그인 버튼 클릭 시 호출되는 함수
const handleLoginClick = async () => {
  try {
      const response = await fetch("http://localhost:4000/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: email, user_pwd: password }), // email을 그대로 전송
      });

      console.log("서버 응답:", response.status); // 응답 코드 확인

      if (response.ok) {
          // 로그인 성공 시
          console.log("로그인 성공"); // 콘솔에 "로그인 성공" 메시지 출력
          alert("로그인 성공!");
          navigate("/"); // 홈으로 이동
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
