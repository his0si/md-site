import React from 'react'
import styled from 'styled-components';
import kakaoLoginImage from '../../assets/kakaoLogin.png';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';

const Container = styled.div`
  width: 360px;
  height: 680px;
  margin: 0 auto;
  background:rgb(248, 250, 243);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.h1`
  font-size: 30px;
  background: linear-gradient(to right,rgb(154, 205, 205), #b0c77e,rgb(214, 214, 143));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 70px;
`;

const TextBackground = styled.div`
  background: radial-gradient(circle, rgba(130, 211, 169, 0.3) 5%, rgba(245,245,245,0) 60%);
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 10px;
  line-height: 1.5;
  color: #333;
  padding: 0 20px;
`;

const ImageButton = styled.img`
  margin-top: 20px;
  cursor: pointer;
  width: 250px;
`;

const ImageGallery = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 20px 0;
  width: 360px;
  padding: 0;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const ImageItem = styled.img`
  width: 160px;
  height: 160px;
  margin-right: 10px;
  flex-shrink: 0;
`;

const Login = () => {
  return (
    <Container>
      <Header>rE: market</Header>
      <TextBackground>
        <Text>
          이화이언의 5월 행사, rE: mark는<br />
          수강 신청으로 놓쳤던 인기 강의를 경험하고,<br />
          이화 출신 선배님의 진솔한 이야기를<br />
          들을 수 있는 특별한 자리입니다.<br /><br />
          rE: mark의 굿즈부스에선<br />
          벗들을 위한 다양한 굿즈를 판매하고 있습니다.<br /><br />
          rE: market에 지금 바로 로그인해서<br />
          마음에 드는 굿즈를 찾아보세요!
        </Text>
      </TextBackground>
      <ImageGallery>
        <ImageItem src={image1} alt="Image 1" />
        <ImageItem src={image2} alt="Image 2" />
        <ImageItem src={image3} alt="Image 3" />
        <ImageItem src={image4} alt="Image 4" />
      </ImageGallery>
      <ImageButton src={kakaoLoginImage} alt="카카오로 3초만에 시작하기" />
    </Container>
  )
}

export default Login
