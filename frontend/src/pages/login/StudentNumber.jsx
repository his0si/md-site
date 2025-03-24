import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Button from "../../components/button";

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
  justify-content: center;
  margin: auto;
  overflow: hidden;  // 혹시 내부 콘텐츠로 인해 스크롤이 생기는 것을 방지
`;

const InstructionText = styled.div`
  font-size: 15px;
  color: #167D4E;
  margin-bottom: 30px;
  text-align: left;
  font-weight: bold;
  width: 80%;
`;

const Input = styled.input`
  width: 80%;
  border: none;
  border-bottom: 1px solid #167D4E;
  margin-bottom: 20px;
  padding: 5px;
  font-size: 16px;
  outline: none;
  background: rgb(255, 255, 255);
`;

const InfoText = styled.div`
  font-size: 12px;
  color: #666;
  text-align: left;
  margin-bottom: 30px;
  width: 80%;
`;


const StudentNumber = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <InstructionText>학번을 입력해주세요.</InstructionText>
        <Input type="text" />
        <InfoText>행사 이후 모든 학번 및 회원 정보는 파기될 예정입니다.</InfoText>
        <Button text={"다음"}/>
      </Container>
    </>
  );
}

export default StudentNumber; 
