import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import checkImage from '../../assets/check.png';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: radial-gradient(circle at 70% 40%, rgba(165, 223, 155, 0.3) 5%, rgba(245,245,245,0) 35%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
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
`;

const Button = styled.button`
  background-color: #167D4E;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: fixed; bottom: 60px;
  width: 300px;

  &:hover {
    background-color: #0d5a3a;
  }
`;

const RegistrationComplete = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Icon src={checkImage} alt="Check" />
        <MainText>회원가입이 완료되었습니다.</MainText>
        <SubText>rE: market의 새로운 회원님을 환영합니다!</SubText>
        <Button>회원가입 마치기</Button>
      </Container>
    </>
  );
}

export default RegistrationComplete; 