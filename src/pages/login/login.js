import Header from "../../component/header/header.js"
import "./login.css";

function Login() {
  return (
      <div>
          <Header/>
      <img src={`img/monami_background.png`} alt="로그인 배경 이미지" className="background" />
      <div className="square-box">       
        <img src={`img/monamiLogo.png`} alt="모나미 배경 이미지" className="monamiLogo" />
        <div className="input-container">
          <img src={`img/People.png`} alt="아이디 이미지" className="img-id" />
          <input type="text" placeholder="Email0000@manami.com" className="login-id" />
          <img src={'img/line.png'} alt="아이디라인" className="line1"/>
          <img src={`img/Password.png`} alt="비번이미지" className="img-password" />
          <input type="password" placeholder="Password" className="login-pw" />
          <img src={'img/line.png'} alt="비번라인" className="line2"/>
        </div>
        <img src={'img/line.png'} alt="sns라인" className="line4"/>
        <img src={'img/welcome.png'} alt="상단웰컴" className="welcome"/>
        <img src={'img/line3 (1).png'} alt="상단라인" className="line3"/>
        <button className="login-button">로그인</button>
        <div className="text-options">
          <a href="/signup" className="link">회원가입</a>
          <a href="/find-id" className="link">아이디 찾기</a>
          <a href="/find-password" className="link">비밀번호 찾기</a>
        </div>
        <label className="sns">SNS계정으로 로그인</label>
      </div>

    </div>
  );
}

export default Login;