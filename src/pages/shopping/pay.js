import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import PayStep from "../../component/paystep/paystep";
import "./pay.css";
import { useLocation } from "react-router-dom";

function Pay() {
    const location = useLocation();
     const { selectedProducts, totalQuantity, totalPrice } = location.state || {}; 

    return (
        <div>
            <Header />
            <div className="ShoppingTop">
                <h1 className="ShoppingTitle">주문결제</h1>
                <div className="PayStep">
                    <PayStep currentStep={1} />
                </div>
            </div>
            <div className="PayWrap">
                <div className="ShoppingContent">
                    <div className="PayInfo"></div>
                    <div className="PayConfirm">
                        <div className="PayTop">주문상품 {totalQuantity}개</div>
                        <div className="PayProduct">
                            {selectedProducts.length > 0 ? (
                                selectedProducts.map(product => (
                                    <div key={product.idx} className="ProductBox">
                                        <div>{product.name}</div>
                                        <div>
                                            {parseInt(product.price.replace("원", ""), 10).toLocaleString()} 원
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>장바구니에 상품이 없습니다.</div>
                            )}
                        </div>
                        <div className="Paymenu">
                            <ul>
                                <li>상품금액</li>
                                <li>배송비</li>
                            </ul>
                            <div className="PayDetails">
                                <ul>
                                    <li>{totalPrice}원</li>
                                    <li>3,000원</li>
                                </ul>
                            </div>
                        </div>
                        <div className="PayBottom">총 결제금액</div>
                        <button className="PayBtn">구매하기</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Pay;
