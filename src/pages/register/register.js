import Header from "../../component/header/header.js";
import "./register.css";
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/signup/success'); // /home으로 이동
      };
    
  return (
    <div>
      <Header />
      <img
        src="/img/monami_background.png"
        alt="로그인 배경 이미지"
        className="background"
      />
      <div className="square-box">
          <span className="signup">회원가입</span>
          <label className="signup-id">아이디</label>
          <img src={'img/line.png'} alt="아이디라인" className="line-id"/>
          <input type="text" placeholder="monami" className="sginput-id" />
        <label className="signup-email">이메일주소</label>
        <input type="email" placeholder="예: Email0000@monami.com" className="input-email" />
        <img src={'img/line.png'} alt="이메일라인" className="line-email"/>
        <label className="signup-password">비밀번호</label>
        <input type="password" placeholder="영문, 숫자 조합  8자리이상" className="input-password" />
        <img src={'img/line.png'} alt="비밀번호라인" className="line-pw"/>
        <label className="signup-checkpw">비밀번호확인</label>
        <input type="password" placeholder="비밀번호 입력" className="input-checkpw" />
        <img src={'img/line.png'} alt="비번확인라인" className="line-checkpw"/>
        <button className="signup-button" onClick={handleLoginClick}>가입하기</button>
      </div>
    </div>
  );
}

export default Register;
