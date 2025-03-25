import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import checkImage from '../../assets/check.png';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  max-width: 500px;
  background: radial-gradient(circle at 70% 40%, rgba(165, 223, 155, 0.3) 5%, rgba(245,245,245,0) 35%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
  padding-top: 200px;
  overflow: hidden;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 20px;
`;

const MainText = styled.div`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const SubText = styled.div`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  white-space: pre-line;
`;

const ButtonWrapper = styled.div`
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 150px;
  padding-bottom: 20px;
`;

const OutlinedButton = styled.button`
  background-color: white;
  color: #167D4E;
  padding: 10px 20px;
  border: 1px solid #167D4E;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 300px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.05);
  }
`;

const FilledButton = styled.button`
  background-color: #167D4E;
  color: white;
  padding: 10px 20px;
  border: 1px solid #167D4E;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 300px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0d5a3a;
    transform: scale(1.05);
  }
`;

const OrderComplete = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Icon src={checkImage} alt="Check" />
        <MainText>주문이 완료되었습니다.</MainText>
        <SubText>마이페이지 → 상품 수정 정보 확인하기에서{'\n'}자세한 상품 수정 정보를 확인하실 수 있습니다.</SubText>
        <ButtonWrapper>
          <OutlinedButton>계속 구매하기</OutlinedButton>
          <FilledButton>주문 마치기</FilledButton>
        </ButtonWrapper>
      </Container>
    </>
  );
}

export default OrderComplete; 
