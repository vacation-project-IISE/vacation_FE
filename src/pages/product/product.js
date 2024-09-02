import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import NavBtn2 from "../../component/buttons/navBtn2";
import './product.css'
function Product() {
    return (
        <div className="ProductPage">
            <Header/>
            <div className="ProductTop">
        <h2>모나미제품</h2>
        <p>모나미는 당신의 행복한 기록과 늘 함께 합니다.</p>
      </div>
      <div className="BtnBox">
        <NavBtn2 SelectedIndex={0} />
      </div>
        <Footer/>
        </div>
    )
}

export default Product;