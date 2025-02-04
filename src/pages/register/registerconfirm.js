import Header from "../../component/header/header.js";
import { useNavigate } from 'react-router-dom';
import './registerconfirm.css';

function Registerconfirm(){
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // /home으로 이동
      };
    
    const handleGoLogin =() =>{
        navigate('/login');
    }
    
    return(
            <div>
              <Header />
              <img src="/img/monami_background.png"alt="로그인 배경 이미지"className="background"/>
               <div className="square-box">
                 <img src="/img/success.png" className="checkmark"alt="회원가입성공"></img>
                 <span className="success-ment">회원가입 완료</span>
                 <button className="Backhome" onClick={handleGoHome}>홈으로</button>
                 <button className="Backlogin" onClick={handleGoLogin}>로그인</button> 
               </div>
              </div>
    )
}
export default Registerconfirm;