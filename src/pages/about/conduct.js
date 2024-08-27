import Header from "../../component/header/header";
import NavBtn from "../../component/buttons/navBtn";
import "./about.css";
function Conduct() {
  return (
    <div className="AboutPage">
      <Header />
      <div className="AboutTop">
        <h2>모나미소개</h2>
        <p>언제 어디서나 모나미는 당신 곁에 있습니다.</p>
      </div>
      <div className="BtnBox">
        <NavBtn SelectedIndex={3} />
      </div>
      <div className="Contents">
      <h3 className="Title1">
          CEO <span>MESSAGE</span>
        </h3>
      </div>
    </div>
    
  );
}

export default Conduct;
