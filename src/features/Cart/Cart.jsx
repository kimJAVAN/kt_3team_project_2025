import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([
    {
      id: 1,
      name: "자바스크립트",
      price: 3500,
      quantity: 2,
      image: "",
      checked: true,
    },
    {
      id: 2,
      name: "리액트",
      price: 2500,
      quantity: 1,
      image: "",
      checked: true,
    },
  ]);

  const [isAllChecked, setIsAllChecked] = useState(true);
  const [isMountainArea, setIsMountainArea] = useState(false);

  // 개별 선택
  const toggleCheck = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updated);
    setIsAllChecked(updated.every((item) => item.checked));
  };

  // 전체 선택
  const toggleAll = () => {
    const newValue = !isAllChecked;
    setIsAllChecked(newValue);
    setItems(items.map((item) => ({ ...item, checked: newValue })));
  };

  // 수량 증가/감소
  const changeQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // 선택 삭제
  const deleteSelected = () => {
    setItems(items.filter((item) => !item.checked));
    setIsAllChecked(false);
  };

  // 전체 삭제
  const deleteAll = () => {
    setItems([]);
    setIsAllChecked(false);
  };

  // 선택된 상품 합계
  const subtotal = items
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 배송비 계산
  let shipping = 0;
  if (subtotal > 0 && subtotal < 30000) shipping = 3500;
  if (isMountainArea) shipping += 5000;
  if (subtotal >= 30000) shipping = 0;

  const total = subtotal + shipping;

  const handleOrder = () => {
    if (subtotal === 0) return alert("선택된 상품이 없습니다.");
    navigate("/pay");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "var(--bg-color)",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "40px",
          maxWidth: "1200px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          padding: "40px",
        }}
      >
        {/* 🛒 왼쪽: 장바구니 목록 */}
        <div style={{ flex: 2 }}>
          <h2
            style={{
              fontSize: "var(--font-large)",
              color: "var(--main-color)",
              marginBottom: "20px",
            }}
          >
            장바구니
          </h2>

          {/* 선택/삭제 버튼 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={isAllChecked}
                onChange={toggleAll}
              />{" "}
              전체선택
            </label>
            <div>
              <button
                onClick={deleteSelected}
                style={{
                  marginRight: "8px",
                  background: "none",
                  border: "none",
                  color: "var(--sub-color)",
                  cursor: "pointer",
                }}
              >
                선택삭제
              </button>
              <button
                onClick={deleteAll}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--sub-color)",
                  cursor: "pointer",
                }}
              >
                전체삭제
              </button>
            </div>
          </div>

          {items.length === 0 ? (
            <p style={{ color: "gray" }}>장바구니가 비어있습니다.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  padding: "16px 0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "8px",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        style={{
                          border: "1px solid #ccc",
                          background: "none",
                          width: "28px",
                          height: "28px",
                          cursor: "pointer",
                        }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        style={{
                          border: "1px solid #ccc",
                          background: "none",
                          width: "28px",
                          height: "28px",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ fontWeight: 600, color: "var(--sub-color)" }}>
                  {(item.price * item.quantity).toLocaleString()}원
                </div>
              </div>
            ))
          )}
        </div>

        {/* 💰 오른쪽: 결제 요약 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "var(--bg-color)",
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "var(--font-medium)",
                color: "var(--main-color)",
                marginBottom: "20px",
              }}
            >
              주문 요약
            </h3>

            <div style={{ marginBottom: "10px" }}>
              <label>
                <input
                  type="checkbox"
                  checked={isMountainArea}
                  onChange={() => setIsMountainArea(!isMountainArea)}
                />{" "}
                도서산간 지역 (+5,000원)
              </label>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>상품 금액</span>
              <span>{subtotal.toLocaleString()}원</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>배송비</span>
              <span>{shipping.toLocaleString()}원</span>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #ccc", margin: "20px 0" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 700,
                fontSize: "var(--font-medium)",
                color: "var(--main-color)",
              }}
            >
              <span>총 결제 금액</span>
              <span>{total.toLocaleString()}원</span>
            </div>

            {subtotal < 30000 && subtotal > 0 && (
              <p
                style={{
                  color: "gray",
                  fontSize: "var(--font-small)",
                  marginTop: "10px",
                }}
              >
                30,000원 이상 구매 시 무료배송!
              </p>
            )}
          </div>

          <button
            onClick={handleOrder}
            style={{
              marginTop: "30px",
              width: "100%",
              backgroundColor: "var(--main-color)",
              color: "#fff",
              fontSize: "var(--font-medium)",
              fontWeight: 600,
              border: "none",
              borderRadius: "8px",
              padding: "14px 0",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "var(--sub-color)")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "var(--main-color)")}
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
