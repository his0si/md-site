import React from "react";
import NavBar2 from "../../components/NavBar2";
import styled from "styled-components";
import CartList from "./CartList";

const Container = styled.div`
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

const Button = styled.button`
  padding: 10px 20px;
  border: 1px solid #167d4e;
  background: ${(props) => (props.primary ? "#167d4e" : "white")};
  color: ${(props) => (props.primary ? "white" : "#167d4e")};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
`;
const Cart = () => {
  return (
    <>
      <Container>
        {/* <NavBar2 /> */}
        <Title>장바구니</Title>
        <ScrollArea>
          <CartList />
        </ScrollArea>
        <BottomBar>
          <Button>선택 주문하기</Button>
          <Button primary>전체 주문하기</Button>
        </BottomBar>
      </Container>
    </>
  );
};

export default Cart;
