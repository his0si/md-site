import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import lockIcon from '../../assets/lock.png';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color:rgb(255, 255, 255);
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 1200px;
  background: radial-gradient(circle at 60% 40%, rgba(165, 223, 155, 0.2) 3%, rgba(245,245,245,0) 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const FormContainer = styled.form`
  width: 80%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  height: 44px;
  
  &:focus {
    outline: none;
    border-color: #167D4E;
  }
`;

const SubmitButton = styled.button`
  min-width: 44px;
  height: 44px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #167D4E;
  }
`;

const LockIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const ErrorMessage = styled.div`
  color: #c5221f;
  margin-bottom: 20px;
  text-align: center;
  min-height: 20px;
`;

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      navigate('/#/admin');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD)  {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/#/admin');
    } else {
      setError(true);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>A D M I N</Title>
        <FormContainer onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
            />
            <SubmitButton type="submit">
              <LockIcon src={lockIcon} alt="Login" />
            </SubmitButton>
          </InputContainer>
          <ErrorMessage>
            {error ? '비밀번호가 올바르지 않습니다.' : ''}
          </ErrorMessage>
        </FormContainer>
      </Container>
    </>
  );
}

export default AdminLogin; 