import React, { useState } from "react";
import styled from "styled-components";
import CartList from "./CartList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  margin: auto;
  min-height: 100vh;
  position: relative;
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  font-weight: 800;
  color: #167d4e;
  padding: 20px 0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 0 70px 0;

  /* 스크롤바 숨기기: 크로스 브라우징 처리 */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
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

const EmptyCartButton = styled.button`
  background-color: #167D4E;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0d5a3a;
    transform: translateX(-50%) scale(1.05);
  }
`;

const Cart = () => {
  const [cartEmpty, setCartEmpty] = useState(false);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: '/api',  // 프록시 설정을 통해 /api로 시작하는 요청은 백엔드로 전달됨
    headers: {
      'Content-Type': 'application/json'
    }
  });
  

  return (
    <>
      {cartEmpty ? (
        <Container>
          <div
            style={{
              textAlign: "center",
              marginBottom: "20vh",
              marginTop: "40vh",
              fontSize: "15px",
            }}
          >
            장바구니가 비었습니다 <br /> 마음에 드는 상품으로 장바구니를 채워
            주세요!
          </div>
          <EmptyCartButton onClick={() => navigate("/")}>마켓구경하기</EmptyCartButton>
        </Container>
      ) : (
        <Container>
          <Title>장바구니</Title>
          <ScrollArea>
            <CartList />
          </ScrollArea>
          <ButtonContainer>
            <Button className="compare">선택 주문하기</Button>
            <Button className="purchase">전체 주문하기</Button>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
};

export default Cart;

