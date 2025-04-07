import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import checkImage from '../../assets/check.png';
import Button from "../../components/button";
import { useNavigate } from 'react-router-dom';

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
  align-items: center;
  justify-content: center;
  margin: auto;
  overflow: hidden;  // 혹시 내부 콘텐츠로 인해 스크롤이 생기는 것을 방지
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



const RegistrationComplete = () => {
  const navigate = useNavigate();
  const handlerButton = ()=>{
    navigate("/");
  };
  return (
    <>
      <GlobalStyle />
      <Container>
        <Icon src={checkImage} alt="Check" />
        <MainText>회원가입이 완료되었습니다.</MainText>
        <SubText>rE: market의 새로운 회원님을 환영합니다!</SubText>
        <Button onClick={handlerButton} text={"회원가입 마치기"}/>
      </Container>
    </>
  );
}

export default RegistrationComplete; 
