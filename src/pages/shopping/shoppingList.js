import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import PayStep from "../../component/paystep/paystep";
import "./shoppingList.css";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

function ShoppingList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [quantities, setQuantities] = useState({});

  const fetchCartItems = () => {
    setLoading(true);
    const token = localStorage.getItem("userToken");
  
    if (!token) {
      console.error("토큰이 없습니다.");
      setLoading(false);
      return;
    }
  
    fetch("http://localhost:4000/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,  // 토큰 헤더에 포함
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Error fetching cart data: ${text}`);
        }
        const data = await response.json();
        setCartItems(data);  // 서버에서 받은 장바구니 아이템을 상태에 저장
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  
  useEffect(() => {
    fetchCartItems();  // 컴포넌트가 렌더링될 때마다 장바구니 아이템을 가져옴
  }, []);

  const handleCheckboxChange = (productIdx) => {
    setCheckedProducts((prev) => {
      const newCheckedState = {
        ...prev,
        [productIdx]: !prev[productIdx],
      };

      if (newCheckedState[productIdx]) {
        setQuantities((prev) => ({ ...prev, [productIdx]: 1 }));
      } else {
        setQuantities((prev) => {
          const newQuantities = { ...prev };
          delete newQuantities[productIdx];
          return newQuantities;
        });
      }

      return newCheckedState;
    });
  };

  const handleSelectAllChange = () => {
    const newCheckedState = {};
    const newQuantities = {};

    if (!isAllSelected) {
      cartItems.forEach((product) => {
        newCheckedState[product.idx] = true;
        newQuantities[product.idx] = quantities[product.idx] || 1;
      });
    }
    setCheckedProducts(newCheckedState);
    setQuantities(newQuantities);
    setIsAllSelected(!isAllSelected);
  };

  const DeleteChecked = () => {
    setCartItems((prevCartItems) => {
      const remainingItems = prevCartItems.filter(
        (product) => !checkedProducts[product.idx]
      );

      setCheckedProducts({});
      return remainingItems;
    });
  };

  const updateQuantity = (productIdx, change) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productIdx] || 1;
      const newQuantity = Math.max(1, currentQuantity + change);
      return { ...prev, [productIdx]: newQuantity };
    });
  };

  const checkedProductCount = Object.keys(checkedProducts).reduce(
    (total, productIdx) =>
      checkedProducts[productIdx]
        ? total + (quantities[productIdx] || 1)
        : total,
    0
  );

  const checkedTotalPrice = cartItems
    .filter((product) => checkedProducts[product.idx])
    .reduce((total, product) => {
      const price = parseInt(product.price.replace("원", ""), 10);
      const quantity = quantities[product.idx] || 0;
      return total + price * quantity;
    }, 0)
    .toLocaleString();

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter(
      (product) => checkedProducts[product.idx]
    );

    const totalQuantity = selectedProducts.reduce(
      (total, product) => total + (quantities[product.idx] || 1),
      0
    );

    const totalPrice = selectedProducts.reduce((total, product) => {
      const price = parseInt(product.price.replace("원", ""), 10);
      const quantity = quantities[product.idx] || 0;
      return total + price * quantity;
    }, 0).toLocaleString();

    navigate("/shopping/pay", {
      state: { selectedProducts, totalQuantity, totalPrice },
    });
  };

  return (
    <div>
      <Header />
      <div className="ShoppingTop">
        <h1 className="ShoppingTitle">장바구니</h1>
        <PayStep currentStep={0} />
      </div>
      <div className="ShoppingWrap">
        <div className="SelectOption">
          <div className="AllSelect">
            <input
              type="checkbox"
              id="check"
              checked={isAllSelected}
              onChange={handleSelectAllChange}></input>
            <label for="check"></label>
            <div className="OptionName">전체선택</div>
          </div>
          <div style={{ color: "#ddd", fontSize: "15px" }}>|</div>
          <div className="OptionDelete" onClick={DeleteChecked}>선택삭제</div>
        </div>
        <div className="ShoppingContent">
          {loading && <div>Loading...</div>}
          {error && (
    <div className="error-message">
      <p>상품 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해 주세요.</p>
    </div>
  )}
          {allProducts.length > 0 && (
            <div className="CartContent">
              <div className="Shoppingwrap">
                {/*{allProducts.length === 0 ? (
                  <p>장바구니가 비었습니다.</p>) : (allProducts.slice(0, 30).map(product => ( */}
                {cartItems.length === 0 ? (
                  <p>장바구니가 비었습니다.</p>) : (cartItems.map((product) => ( 
                
                  <div key={product.idx} className="ShoppingBox">
                    <div style={{ display: "flex" }}>
                      <div className="CheckBtn">
                        <input
                          type="checkbox"
                          id={`check-${product.idx}`}
                          checked={checkedProducts[product.idx] || false} // 체크됐는지 확인
                          onChange={() => handleCheckboxChange(product.idx)}
                        />
                        <label
                          htmlFor={`check-${product.idx}`}
                          style={{
                            backgroundImage: `url(${
                              checkedProducts[product.idx]
                                ? "/img/blueCheck.png"
                                : "/img/greyCheck.png"
                            })`,
                          }}></label>
                      </div>
                      <div className="ProductImg">
                        <img src={product.image_url} alt={product.image_alt} />
                      </div>
                      <div className="ProductInfo">
                        <div className="ProductName">{product.name}</div>
                        <div className="ProductCate">{product.category}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="QuantityBtn">
                        <button onClick={() => updateQuantity(product.idx, -1)}>
                          -
                        </button>
                        <span>{quantities[product.idx] || 1}</span>
                        <button onClick={() => updateQuantity(product.idx, 1)}>
                          +
                        </button>
                      </div>
                      <div className="ProductPrice">
                        {parseInt(
                          product.price.replace("원", ""),
                          10
                        ).toLocaleString()}
                        원
                      </div>
                    </div>
                  </div>
                )))}
              </div>
            </div>
          )}

          <div className="PayContent">
            <div className="PayTop">결제정보</div>
            <div className="PayInfo">
              <ul>
                <li>상품수</li>
                <li>상품금액</li>
                <li>배송비</li>
              </ul>
              <div className="PayDetails">
                <ul>
                  <li>{checkedProductCount}개</li>
                  <li>{checkedTotalPrice}원</li>
                  <li>3,000원</li>
                </ul>
              </div>
            </div>

            <div className="PayBottom">총 결제금액</div>
            <button onClick={handleCheckout} className="PayBtn">
              구매하기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShoppingList;
