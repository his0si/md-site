import React, { useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  background: radial-gradient(circle at 50% 30%, rgba(165, 223, 155, 0.3) 5%, rgba(245,245,245,0) 35%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  overflow: hidden;  // 혹시 내부 콘텐츠로 인해 스크롤이 생기는 것을 방지
`;

const Redirection = () => {
    const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (code) {
      axiosInstance
        .get("/login/kakao-login", {
          params: { code: code },
        })
        .then((response) => {
            if (response.status === 201) {
                navigate('/');
              } else if (response.status === 200) {
                navigate('/student-number');
              } else {
                console.warn("예상치 못한 응답 코드:", response.status);
              }
        })
        .catch((err) => {
          console.error("로그인 실패:", err);
        });
    }
  }, [code, navigate]);
  return (
    <>
    <GlobalStyle/>
    <Container>
      로그인 중입니다.<br/>
      잠시만 기다려주세요.
    </Container>
    </>
  )
}

export default Redirection
