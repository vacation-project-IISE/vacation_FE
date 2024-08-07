import Header from "../../component/header/header.js"
import "./login.css";

function Login() {
  return (
      <div>
          <Header/>
      <img src={`img/monami_background.png`} alt="로그인 배경 이미지" />
      <div className="square-box"> ㅘㅇ</div>
      <img src={`img/monami_logo.png`} alt="모나미 배경 이미지" />
    </div>
  );
}

export default Login;
