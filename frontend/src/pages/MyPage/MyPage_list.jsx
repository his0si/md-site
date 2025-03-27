import React from "react";
import NavBar2 from "../../components/NavBar2";
import OrderList from "./OrderList";

import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  //align-items: center;
  justify-content: flex-start;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  color: #167d4e;
  margin-botton: 30px;
`;

const ScrollableContent = styled.div`
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

const MyPage_list = () => {
  return (
    <Container>
      {/* <NavBar2 /> */}

      <Title>내 주문 목록 </Title>
      <ScrollableContent>
        <OrderList />
      </ScrollableContent>
    </Container>
  );
};

export default MyPage_list;
