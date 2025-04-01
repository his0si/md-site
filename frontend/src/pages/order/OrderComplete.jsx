import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import checkImage from "../../assets/check.png";
import OrderCompleteIcon from "../../assets/OrderCompleteIcon.png";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-bottom: 100px;
  margin-top: 100px;
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

  span {
    color: #167d4e;
    font-weight: bold;
  }

  .icon-text-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  img {
    width: 12px;
    height: 12px;
    display: block;
  }
`;

const ButtonWrapper = styled.div`
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-bottom: 40px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  z-index: 10;
`;

const OutlinedButton = styled.button`
  background-color: white;
  color: #167d4e;
  padding: 10px 20px;
  border: 1px solid #167d4e;
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
  background-color: #167d4e;
  color: white;
  padding: 10px 20px;
  border: 1px solid #167d4e;
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
        <ContentWrapper>
          <Icon src={checkImage} alt="Check" />
          <MainText>주문이 완료되었습니다.</MainText>
          <SubText>
            <span>
              <div className="icon-text-wrapper">
                <img src={OrderCompleteIcon} alt="icon" />
                마이페이지 → 상품 수령 정보 확인하기
              </div>
            </span>
            에서{"\n"}자세한 상품 수령 정보를 확인하실 수 있습니다.
          </SubText>
        </ContentWrapper>
        <ButtonWrapper>
          <OutlinedButton>계속 구경하기</OutlinedButton>
          <FilledButton>주문 마치기</FilledButton>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default OrderComplete;
