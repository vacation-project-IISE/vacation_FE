import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import PayStep from "../../component/paystep/paystep";
import "./shoppingList.css";
import { useNavigate, useParams } from "react-router-dom";
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
    setLoading(true);
    Promise.all([fetch("/MonamiData.json"), fetch("/productDetails.json")])
      .then(async ([responseMonami, responseProductDetail]) => {
        if (!responseMonami.ok) {
          const text = await responseMonami.text();
          throw new Error(`Error fetching MonamiData.json: ${text}`);
        }
        if (!responseProductDetail.ok) {
          const text = await responseProductDetail.text();
          throw new Error(`Error fetching productDetail.json: ${text}`);
        }

        const monamiData = await responseMonami.json();
        const productDetailData = await responseProductDetail.json();

        const allProducts = Object.keys(monamiData.product).reduce((acc, key) => acc.concat(monamiData.product[key]), []);
        const mergedProducts = allProducts.map((product) => {
          const productDetail = productDetailData.find(detail => detail.idx === product.idx);
          return {
            ...product,
            price: productDetail ? productDetail.price : "N/A",
          };
        });

        setAllProducts(mergedProducts);

        // Retrieve cart items from localStorage or state
        const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartProducts = mergedProducts.filter(product => savedCartItems.includes(product.idx));

        setCartItems(cartProducts);  // Set only the cart items
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

        // 전체 제품 데이터를 하나의 어레이로 저장
        // const allProducts = Object.keys(monamiData.product).reduce(
        //   (acc, key) => {
        //     return acc.concat(monamiData.product[key]);
        //   },
        //   []
        // );
        // 가격 데이터가 포함된 MergeProducts
  //       const mergedProducts = allProducts.map(product => {
  //         const productDetail = productDetailData.find(
  //           detail => detail.idx === product.idx
  //         );
  //         return {
  //           ...product,
  //           price: productDetail ? productDetail.price : "N/A",
  //         };
  //       });
  //       setAllProducts(mergedProducts);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     });
  // }, []);

  // 어떤 제품을 체크했는지
  const handleCheckboxChange = productIdx => {
    setCheckedProducts(prev => {
      const newCheckedState = {
        ...prev,
        [productIdx]: !prev[productIdx],
      };
      
      // 기본 디폴트 값을 1로 지정하고, 개수를 체크함
      if (newCheckedState[productIdx]) {
        setQuantities(prev => ({ ...prev, [productIdx]: 1 }));
      } else {
        // 체크가 되지 않으면 수량을 없앰
        setQuantities(prev => {
          const newQuantities = { ...prev };
          delete newQuantities[productIdx];
          return newQuantities;
        });
      }
  
      return newCheckedState;
    });
  };

  // 전체선택 버튼 클릭
  const handleSelectAllChange = () => {
    const newCheckedState = {};
    const newQuantities = {};
    if (!isAllSelected) {
      // 전체 선택이 아닐경우 전체선택 실행, 일단 8개 최대로 제한해둠
      allProducts.slice(0, 30).forEach(product => {
        newCheckedState[product.idx] = true;
        newQuantities[product.idx] = quantities[product.idx] || 1; // 제품 별 개수를 카운트, 변동 없을시 디폴트=1개
    });
    }
    setCheckedProducts(newCheckedState);
    setQuantities(newQuantities); 
    setIsAllSelected(!isAllSelected);
  };

  // 체크된 상품만 계산
  const checkedProductCount = Object.keys(checkedProducts).reduce(
    (total, productIdx) => {
      if (checkedProducts[productIdx]) {
        const quantity = quantities[productIdx] || 1; // 수량을 가져오거나 변동이 없으면 1로 가져옴
        return total + quantity; // 개별 수량을 포함한 전체 수량
      }
      return total;
    },
    0
  );
  // 체크된 상품들의 금액을 계산
  const checkedTotalPrice = allProducts
  .filter(product => checkedProducts[product.idx]) // 체크된 상품만 계산
  .reduce((total, product) => {
    const price = parseInt(product.price.replace("원", ""), 10);
    const quantity = quantities[product.idx] || 0; // 상품별 개수 확인
    return total + (isNaN(price) ? 0 : price * quantity); // 전체 금액 계산
  }, 0)
  .toLocaleString();

  //.toLocaleString(); = 세자리 마다 콤마를 붙여줌 (1000->1,000)

  const updateQuantity = (productIdx, change) => {
    setQuantities(prev => {
      const currentQuantity = prev[productIdx] || 1;
      const newQuantity = Math.max(1, currentQuantity + change); // 개수가 1 이하로 내려가지 않도록
      return { ...prev, [productIdx]: newQuantity };
    });
  };

  const handleCheckout = () => {
    // 체크된 상품들만 필터링
    const selectedProducts = allProducts.filter(
      product => checkedProducts[product.idx]
    );
   
    const totalQuantity = selectedProducts.reduce((total, product) => {
      const quantity = quantities[product.idx] || 1; // Default quantity to 1
      return total + quantity;
  }, 0);

  const totalPrice = selectedProducts.reduce((total, product) => {
    const price = parseInt(product.price.replace("원", ""), 10);
    const quantity = quantities[product.idx] || 0; // Default to 0 if undefined
    return total + (isNaN(price) ? 0 : price * quantity); // Calculate total price
  }, 0).toLocaleString();
    
    // 장바구니 단계에서 체크된 상품, (개별 개수를 포함한) 총 개수, 총 금액 전달
    // '주문결제'단계로 체크된 상품 정보 전달
    navigate("/shopping/pay", { state: { selectedProducts, totalQuantity, totalPrice } });  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
          <div className="OptionName">선택삭제</div>
        </div>
        <div className="ShoppingContent">
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {allProducts.length > 0 && (
            <div className="CartContent">
              <div className="Shoppingwrap">
              {cartItems.map((product) => (
                // {allProducts.slice(0, 30).map(product => (
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
                ))}
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
