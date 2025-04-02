import React from "react";
import OrderList from "./OrderList";

import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 90%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding-top: 50px;
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  font-weight: 800;
  color: #167d4e;
  margin-top: 5vh;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 50px 0 20px 0;

  /* 스크롤바 숨기기: 크로스 브라우징 처리 */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MyPage_list = () => {
  return (
    <Container>
      <Title>내 주문 목록</Title>
      <ScrollableContent>
        <OrderList />
      </ScrollableContent>
    </Container>
  );
};

export default MyPage_list;
