import React, { useEffect, useRef } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import kakaoLoginImage from '../../assets/kakaoLogin.png';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
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

const Header = styled.h1`
  font-size: 35px;
  background: linear-gradient(to right,rgb(154, 205, 205), #b0c77e,rgb(214, 214, 143));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
`;

const TextBackground = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Text = styled.div`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 11px;
  line-height: 1.7;
  color: #333;
  padding: 0 20px;
  max-width: 300px; 
`;

const ImageButton = styled.img`
  margin-top: 20px;
  cursor: pointer;
  width: 250px;
  transition: all 0.2s ease-in-out;

  &:hover {
    filter: brightness(0.9);
    transform: scale(1.05);
  }
`;

const ImageGallery = styled.div`
  display: flex;
  overflow: hidden;
  margin: 20px 0;
  width: 100%;
  padding: 0;
`;

const slide = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-640px); /* 4장의 이미지 너비 (160px * 4) */
  }
`;

const ImageContainer = styled.div`
  display: flex;
  animation: ${slide} 15s linear infinite;
  width: fit-content;
`;

const ImageItem = styled.img`
  width: 160px;
  height: 160px;
  margin: 0 auto;
  flex-shrink: 0;
`;

const Login = () => {
  const images = [image1, image2, image3, image4];

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>rE: market</Header>
        <TextBackground>
          <Text>
            이화이언의 5월 행사, <strong>rE: mark</strong>는<br />
            <strong>수강 신청으로 놓쳤던 인기 강의를 경험</strong>하고,<br />
            <strong>이화 출신 선배님의 진솔한 이야기</strong>를<br />
            들을 수 있는 <strong>특별한 자리</strong>입니다.<br /><br />
            <strong>rE: mark</strong>의 <strong>굿즈부스</strong>에선<br />
            벗들을 위한 다양한 굿즈를 판매하고 있습니다.<br /><br />
            <strong>rE: market</strong>에 지금 바로 로그인해서<br />
            <strong>마음에 드는 굿즈를 찾아보세요!</strong>
          </Text>
        </TextBackground>
        <ImageGallery>
          <ImageContainer>
            {/* 무한 슬라이드를 위해 이미지를 두 번 반복 */}
            {[...images, ...images].map((image, index) => (
              <ImageItem key={index} src={image} alt={`Image ${(index % 4) + 1}`} />
            ))}
          </ImageContainer>
        </ImageGallery>
        <ImageButton src={kakaoLoginImage} alt="카카오로 3초만에 시작하기" />
      </Container>
    </>
  )
}

export default Login
