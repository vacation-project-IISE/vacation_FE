import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../firebase/firebase";
import "./loginBtn.css"


function LoginBtn() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    
    useEffect(() => {
      const auth = getAuth(app);
  
      // 인증 상태 변화 추적
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLogin(true); // 로그인된 상태
        } else {
          setIsLogin(false); // 로그인되지 않은 상태
        }
      });
  
      // 컴포넌트 언마운트 시 인증 상태 변경 리스너를 정리
      return () => unsubscribe();
    }, []);
  
   // 로그인/로그아웃 처리 함수
   const handleLogin = async () => {
    if (isLogin) {
      try {
        const auth = getAuth(app);
        await signOut(auth); // Firebase에서 로그아웃 처리
        setIsLogin(false); // 로그인 상태 업데이트
        localStorage.removeItem("userToken"); // 로컬스토리지에서 토큰 제거
        localStorage.setItem("isLogin", JSON.stringify(false)); // 로컬스토리지 상태 업데이트
        navigate("/"); // 홈으로 이동
      } catch (error) {
        console.error("로그아웃 오류: ", error);
      }
    } else {
      navigate("/login"); // 로그인 페이지로 이동
    }
  };
  
    // // 로그인 상태가 변경될 때마다 로컬스토리지에 반영
    // useEffect(() => { 
    //   const storedLoginStatus = localStorage.getItem("isLogin"); 
    //   if (storedLoginStatus) { 
    //     setIsLogin(JSON.parse(storedLoginStatus)); 
    //   } 
    // }, []); 


  // 로그인/로그아웃 처리 함수
  // const handleLogin = () => {
  //   if (isLogin) {
  //     // 로그아웃 처리
  //     setIsLogin(false);
  //     localStorage.removeItem("userToken"); // 사용자 토큰 제거
  //     localStorage.setItem("isLogin", JSON.stringify(false));
  //   } else {
  //     // 로그인 페이지로 이동
  //     navigate("/login");
  //   }
  // };

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