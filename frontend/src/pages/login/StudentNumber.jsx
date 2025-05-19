import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Button from "../../components/button";
import Modal from "../../components/Modal";
import { Navigate, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';

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
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleInputChange = (e) =>{
    setStudentId(e.target.value);
  };

  const handleSubmit = async () =>{
    if(!studentId){
      setModalMessage("학번을 입력해주세요!");
      setIsModalOpen(true);
      return;
    }
    try {
      const res = await axiosInstance.post("/login/signup", {
        studentId: studentId,
      }).then((res)=>{
        if(res.status === 201){
          navigate("/registration-complete");
        }
      }) 
    } catch (error) {
      setModalMessage('오류가 발생했습니다.');
      setIsModalOpen(true);
    }
  }
  return (
    <>
      <GlobalStyle />
      <Container>
        <InstructionText>학번을 입력해주세요.</InstructionText>
        <Input type="text" value={studentId} onChange={handleInputChange} />
        <InfoText>행사 이후 모든 학번 및 회원 정보는 파기될 예정입니다.</InfoText>
        <Button text={"다음"} onClick={handleSubmit} />
      </Container>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          if (modalMessage === '오류가 발생했습니다.') {
            navigate("/");
          }
        }}
        closeButton="확인"
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
}

export default StudentNumber; 
