import { useState, useEffect } from "react";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "./mypage.css";

function Mypage() {
  const [wishlist, setWishlist] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);

  const user_id = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!user_id || !token) {
          console.error("로그인이 필요합니다.");
          return;
        }

        const response = await fetch(
          "http://localhost:4000/api/wish/getWishlist",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id }),
          }
        );

        if (!response.ok) {
          throw new Error("위시리스트를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error("위시리스트 조회 실패:", error);
      }
    };

    fetchWishlist();
    console.log(wishlist);
  }, [user_id]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user_id || !token) {
          console.error("로그인이 필요합니다.");
          return;
        }

        const response = await fetch(
          "http://localhost:4000/api/order/getOrders",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id }),
          }
        );

        if (!response.ok) {
          throw new Error("주문 데이터를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setOrderList(data);
      } catch (error) {
        console.error("주문 데이터 조회 실패:", error);
      }
    };

    fetchOrders();
    console.log(orderList);
  }, [user_id]);

  // 주문 항목 클릭 핸들러
  const handleOrderClick = order => {
    if (orderDetail?.order_number === order.order_number) {
      setOrderDetail(null); // 이미 열려 있으면 닫음
    } else {
      setOrderDetail(order); // 클릭된 주문 데이터 저장
    }
  };

  return (
    <div>
      <Header />
      <div className="MyPageWrap">
        <div className="left-box">
          <img
            src="img/mypageicon.png"
            className="mypageicon"
            alt="마이페이지아이콘"
          />
          <div className="my-email">
            <p>{user_id}</p>
          </div>
        </div>

        <div className="MyPageContent">
          {/* 위시리스트 섹션 */}
          <div className="wishlist">
            <h1>위시리스트</h1>
            <ul className="wishlist-row">
              {wishlist.items && Array.isArray(wishlist.items) ? (
                wishlist.items.map((item, index) => (
                  <li key={index} className="wishlist-item">
                    <img src={item.image_url} alt={item.image_alt} />
                    <p className="wishItem-cate">{item.category_name}</p>
                    <p className="wishItem-name">{item.product_name}</p>
                    <p className="wishItem-price">
                      {item.price.toLocaleString()}원
                    </p>
                  </li>
                ))
              ) : (
                <p>위시리스트가 비어 있습니다.</p>
              )}
            </ul>
          </div>

          {/* 결제 내역 섹션 */}
          <div className="paylist">
            <h1>결제 내역</h1>
            <h3>결제 내역을 클릭하면 상세 주문 정보를 볼 수 있습니다!</h3>
            <ul className="paylist-table">
              <li className="paylist-header">
                <span>주문번호</span>
                <span className="paylist-name">상품 이름</span>
                <span>결제 금액</span>
                <span>배송지</span>
                <span>처리 상태</span>
              </li>
              {orderList.length > 0 ? (
                orderList.map((order, index) => (
                  <div>
                    <li
                      className="paylist-item"
                      key={index}
                      onClick={() => handleOrderClick(order)} // 클릭 이벤트 추가
                    >
                      <div className="paylist-info">
                        <span>{order.order_number}</span>
                        <span className="paylist-name">
                          {order.product_name}
                        </span>
                        <span>{order.total_price.toLocaleString()}원</span>
                        <span>{order.address}</span>
                        <span>결제 완료</span>
                      </div>
                    </li>
                    {/* 클릭된 주문의 product_array 표시 */}
                    {orderDetail?.order_number === order.order_number && (
                      <ul className="product-array">
                        {order.product_array.map((product, idx) => (
                          <li key={idx} className="product-item">
                            <img
                              src={product.imageUrl}
                              alt={product.product_name}
                              className="product-image"
                            />
                            <span>{product.name}</span>
                            <span>{product.quantities}</span>
                            <span>{product.price.toLocaleString()}원</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <li className="paylist-item">
                  <span colSpan="4">주문 내역이 없습니다.</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Mypage;
