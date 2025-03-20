import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
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

const StudentNumber = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <InstructionText>학번을 입력해주세요.</InstructionText>
        <Input type="text" />
        <InfoText>행사 이후 모든 학번 및 회원 정보는 파기될 예정입니다.</InfoText>
        <Button>다음</Button>
      </Container>
    </>
  );
}

export default StudentNumber; 