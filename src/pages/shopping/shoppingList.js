import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import PayStep from "../../component/paystep/paystep";
import "./shoppingList.css";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("userId");

      if (!token || !user_id) {
        setLoading(false);
        setError("로그인이 필요합니다. 다시 로그인해주세요.");
        return;
      }

      try {
        // 백엔드에서 장바구니 데이터 가져오기
        const cartResponse = await fetch(
          `http://localhost:4000/api/cart?user_id=${encodeURIComponent(
            user_id
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!cartResponse.ok) {
          const message = await cartResponse.text();
          throw new Error(
            message || "장바구니 데이터를 불러오는 중 오류가 발생했습니다."
          );
        }

        const cartData = await cartResponse.json();

        // 전체 상품 데이터 가져오기
        const productResponse = await fetch("/productDetails.json");
        if (!productResponse.ok) {
          throw new Error("상품 데이터를 불러오는 중 오류가 발생했습니다.");
        }
        const productDetails = await productResponse.json();

        // 병합: 이름을 정규화하여 비교
        const mergedData = cartData.map(cartItem => {
          const normalizedCartName = cartItem.product_name
            .toLowerCase()
            .replace(/\s+/g, "");

          const productDetail = productDetails.find(
            product =>
              product.name.toLowerCase().replace(/\s+/g, "") ===
              normalizedCartName
          );

          if (productDetail) {
            return {
              ...cartItem, // 백엔드 데이터
              ...productDetail, // 전체 상품 데이터
            };
          }

          return cartItem; // 전체 데이터에 없으면 백엔드 데이터만 유지
        });

        setCartItems(mergedData);
        // console.log(mergedData);
      } catch (err) {
        setError(err.message || "데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = productIdx => {
    setCheckedProducts(prev => {
      const newCheckedState = {
        ...prev,
        [productIdx]: !prev[productIdx],
      };

      if (newCheckedState[productIdx]) {
        setQuantities(prevQuantities => ({
          ...prevQuantities,
          [productIdx]: 1,
        }));
      } else {
        setQuantities(prevQuantities => {
          const newQuantities = { ...prevQuantities };
          delete newQuantities[productIdx];
          return newQuantities;
        });
      }
      // 전체 선택 상태 업데이트
      const allChecked =
        cartItems.length > 0 &&
        cartItems.every(product => newCheckedState[product.idx]);
      setIsAllSelected(allChecked);

      return newCheckedState;
    });
  };

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      // 전체 해제
      setCheckedProducts({});
      setQuantities({});
    } else {
      // 전체 선택
      const newCheckedState = {};
      const newQuantities = {};

      cartItems.forEach(product => {
        newCheckedState[product.idx] = true;
        newQuantities[product.idx] = quantities[product.idx] || 1;
      });

      setCheckedProducts(newCheckedState);
      setQuantities(newQuantities);
    }

    setIsAllSelected(!isAllSelected);
  };

  const DeleteChecked = async () => {
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("userId");

      const selectedProductIds = cartItems
        .filter((product) => checkedProducts[product.idx])
        .map((product) => product.product_name); // Firestore에서 고유 식별자 사용

      if (selectedProductIds.length === 0) {
        alert("선택된 항목이 없습니다.");
        return;
      }

      const response = await fetch("http://localhost:4000/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ${token}',
        },
        body: JSON.stringify({
          user_id,
          product_name: selectedProductIds, // 삭제 요청에 필요한 데이터
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "삭제 요청에 실패했습니다.");
      }

      // 성공적으로 삭제된 경우 클라이언트 상태 업데이트
      setCartItems((prevCartItems) =>
        prevCartItems.filter((product) => !checkedProducts[product.idx])
      );
      setCheckedProducts({});
      alert("선택된 항목이 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 오류:", error.message);
      alert(error.message || "삭제 중 문제가 발생했습니다.");
    }
  };


  const updateQuantity = (productIdx, change) => {
    setQuantities(prev => {
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
    .filter(product => checkedProducts[product.idx])
    .reduce((total, product) => {
      const price = product.price;
      const quantity = quantities[product.idx] || 0;
      return total + price * quantity;
    }, 0)
    .toLocaleString();

// 문자열 형태를 숫자로 변환 후 3000을 더한 값 계산
const resultPrice = (Number(checkedTotalPrice.replace(/,/g, '')) + 3000).toLocaleString();
  
  const handleCheckout = () => {
    const selectedProducts = cartItems.filter(
      product => checkedProducts[product.idx]
    );

    const totalQuantity = selectedProducts.reduce(
      (total, product) => total + (quantities[product.idx] || 1),
      0
    );

    const totalPrice = selectedProducts.reduce((total, product) => {
      // product.price는 이미 숫자 타입이므로 그대로 사용
      const price = product.price;
      const quantity = quantities[product.idx] || 0;
      return total + price * quantity;
    }, 0);

    navigate("/shopping/pay", {
      state: {
        selectedProducts,
        totalQuantity,
        totalPrice: totalPrice.toLocaleString(),
        quantities,
      },
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
          <div className="OptionDelete" onClick={DeleteChecked}>
            선택삭제
          </div>
        </div>
        <div className="ShoppingContent">
          {loading && <div>Loading...</div>}
          {error && (
            <div className="error-message">
              <p>
                상품 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해
                주세요.
              </p>
            </div>
          )}
          <div className="CartContent">
            <div className="Shoppingwrap">
              {cartItems.length === 0 ? (
                <p>장바구니가 비었습니다.</p>
              ) : (
                cartItems.map(product => (
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
                        <img src={product.imageUrl} alt={product.idx} />
                      </div>
                      <div className="ProductInfo">
                        <div className="ProductName">{product.name}</div>
                        <div className="ProductCate">
                          {product.category_name}
                        </div>
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
                        {product.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

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

            <div className="PayBottomWrap">
              <div className="PayBottom">총 결제금액</div>
              <div className="ResultPrice">{resultPrice}원</div>
            </div>

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
