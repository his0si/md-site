import React, { useState } from "react";
import NavBar2 from "../../components/NavBar2";
import styled from "styled-components";
import CartList from "./CartList";

const Container2 = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding-top: 50px;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  font-weight: 800;
  color: #167d4e;
  margin-top: 5vh;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto; /* ✅ 내부 컨텐츠만 스크롤 가능하게 설정 */
  padding: 50px 0 20px 0;

  /* 스크롤바 숨기기: 크로스 브라우징 처리 */
  -ms-overflow-style: none; /* IE, Edge 브라우저 전용 제어 */
  scrollbar-width: none; /* Firefox 브라우저 전용용 */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera 브라우저 전용 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.compare {
    background-color: white;
    color: black;
    border: 1px solid #167D4E;
    
    &:hover {
      background-color: #f5f5f5;
      transform: scale(1.05);
    }
  }
  
  &.purchase {
    background-color: #167D4E;
    color: white;
    border: 1px solid #167D4E;
    
    &:hover {
      background-color: #0d5a3a;
      transform: scale(1.05);
    }
  }
`;

const Cart = () => {
  const [cartEmpty, setCartEmpty] = useState(false);

  return (
    <>
      {cartEmpty ? (
        <Container>
          <div
            style={{
              textAlign: "center",
              marginBottom: "40vh",
              marginTop: "30vh",
            }}
          >
            장바구니가 비었습니다 <br /> 마음에 드는 상품으로 장바구니를 채워
            주세요!
          </div>
          <Button className="purchase">마켓구경하기</Button>
        </Container>
      ) : (
        <Container2>
          <Title>장바구니</Title>
          <ScrollArea>
            <CartList />
          </ScrollArea>
          <ButtonContainer>
            <Button className="compare">선택 주문하기</Button>
            <Button className="purchase">전체 주문하기</Button>
          </ButtonContainer>
        </Container2>
      )}
    </>
  );
};

export default Cart;
