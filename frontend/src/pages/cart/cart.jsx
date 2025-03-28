import React from "react";
import NavBar2 from "../../components/NavBar2";
import styled from "styled-components";
import CartList from "./CartList";
import Button from "../../components/button";

const Container2 = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: center;
  margin: auto;
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
  margin-botton: 30px;
  margin-top: 30px;
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

const BottomBar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px;
  border-top: 1px solid #ccc;
  position: sticky; // 또는 fixed
  bottom: 0;
  background: white;
`;

const Button1 = styled.button`
  background-color: #167d4e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 75%;
`;

const Button2 = styled.button`
  padding: 10px 20px;
  border: 1px solid #167d4e;
  background: ${(props) => (props.primary ? "#167d4e" : "white")};
  color: ${(props) => (props.primary ? "white" : "#167d4e")};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
`;

const cartEmpty = true;

const Cart = () => {
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
          <Button1>마켓구경하기</Button1>
        </Container>
      ) : (
        <Container2>
          <Title>장바구니</Title>
          <ScrollArea>
            <CartList />
          </ScrollArea>
          <BottomBar>
            <Button2>선택 주문하기</Button2>
            <Button2 primary>전체 주문하기</Button2>
          </BottomBar>
        </Container2>
      )}
    </>
  );
};

export default Cart;
