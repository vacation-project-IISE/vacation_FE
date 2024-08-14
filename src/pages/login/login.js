import Header from "../../component/header/header.js"
import "./login.css";

function Login() {
  return (
      <div>
          <Header/>
      <img src={`img/monami_background.png`} alt="로그인 배경 이미지" />
      <div className="square-box"> 중간 로그인 화면 창</div>
      <img src={`img/monami_logo.png`} alt="모나미 배경 이미지" />
    </div>
  );
}

export default Login;
