import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import pitdotImage from '../../assets/pitdot.png';
import kimSeungWooImage from '../../assets/KimSeungWoo.png';
import choiJaeCheonImage from '../../assets/ChoiJaeCheon.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scrollIndicatorAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 0 16px 80px;
  position: relative;
`;

const AnimatedSection = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay}s;
`;

const Title = styled.h1`
  font-size: 1.3em;
  color: #167D4E;
  margin: 60px 0 10px;
  font-weight: bold;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 1.2em;
  color: #167D4E;
  margin: 0 0 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.0em;
  color: #4b4b4b;
  margin: 50px 20px 40px;
  text-align: center;
  line-height: 1.6;
  font-weight: 700;
`;

const EventDetails = styled.div`
  width: 95%;
  margin: 20px auto;
  padding: 20px 0 60px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
`;

const EventTitle = styled.p`
  font-size: 0.9em;
  color: #167D4E;
  margin-top: 40px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const EventDate = styled.p`
  font-size: 0.8em;
  color: #167D4E;
  margin: 0;
  font-weight: bold;
`;

const PitdotImage = styled.img`
  width: 60%;
  margin: 60px auto;
  display: block;
`;

const PromotionText = styled.p`
  font-size: 0.9em;
  color: #4b4b4b;
  text-align: center;
  line-height: 1.6;
  margin: 0;
  
  span {
    font-weight: 800;
  }
`;

const ScheduleContainer = styled.div`
  width: 95%;
  margin: 40px auto;
  padding: 0 0 60px;
  border-bottom: 1px solid #e0e0e0;
`;

const ScheduleTitle = styled.p`
  font-size: 0.9em;
  color: #167D4E;
  margin: 0 0 5px;
  font-weight: bold;
`;

const ScheduleDate = styled.p`
  font-size: 1.0em;
  color: #333;
  margin: 0 0 30px;
  font-weight: bold;
`;

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1px 20px;
  align-items: center;
`;

const ScheduleLabel = styled.span`
  font-size: 1.0em;
  color: #4b4b4b;
  font-weight: bold;
  text-align: left;
`;

const ScheduleTime = styled.span`
  font-size: 1.0em;
  color: #333;
  font-weight: bold;
  text-align: left;
`;

const LocationContainer = styled.div`
  width: 95%;
  margin: 20px auto;
  padding: 0 0 60px;
  border-bottom: 1px solid #e0e0e0;
`;

const LocationTitle = styled(ScheduleTitle)`
  /* Style is inherited */
`;

const LocationText = styled(ScheduleDate)`
  margin-bottom: 0;
`;

const SpeakersContainer = styled.div`
  width: 95%;
  margin: 40px auto;
  padding: 0 0 60px;
  border-bottom: 1px solid #e0e0e0;
`;

const SpeakersTitle = styled(LocationTitle)`
  margin-bottom: 40px;
`;

const SpeakerCard = styled.div`
  text-align: center;
  margin-bottom: 50px; /* Space between speaker cards */

  &:last-child {
    margin-bottom: 0; /* No margin for the last card */
  }
`;

const SpeakerImage = styled.img`
  width: 150px; /* Adjust size as needed */
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const SpeakerName = styled.p`
  font-size: 1.0em;
  font-weight: bold;
  color: #333;
  margin: 0 0 8px;
`;

const LecturePart = styled.p`
  font-size: 0.9em;
  color: #555;
  margin: 0 0 1px;
`;

const LectureTitle = styled.p`
  font-size: 0.9em;
  color: #555;
  margin: 0;
`;

const BoothInfoContainer = styled.div`
  width: 95%;
  margin: 20px auto;
  padding: 0 0 60px;
  border-bottom: 1px solid #e0e0e0;
`;

const BoothInfoTitle = styled(LocationTitle)`
  margin-bottom: 10px;
`;

const BoothListItem = styled.p`
  font-size: 1.0em;
  color: #333;
  margin: 0 0 5px;
  font-weight: bold;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ScrollIndicator = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(22, 125, 78, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9em;
  animation: ${scrollIndicatorAnimation} 5s ease-in-out forwards;
  z-index: 1000;
  pointer-events: none;
  margin-right: 10px;
`;

const EventIntro = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      {showScrollIndicator && <ScrollIndicator>스크롤하여 rE: mark의 더 많은 이야기를 만나보세요 ↓</ScrollIndicator>}
      <AnimatedSection delay={0.2}>
        <Title>이화이언 5월 행사</Title>
        <Subtitle>&lt;&nbsp;rE:mark&nbsp;&gt;</Subtitle>
        <Description>
          이화이언의 5월 행사, rE: mark는<br />
          이화 교수님들의 강의를 경험하고<br />
          이화이언 강연회에서만 들을 수 있는<br />
          이야기를 공유하는 행사입니다.
        </Description>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <EventDetails>
          <EventTitle>픽닷 이대점 X 이화이언 콜라보 이벤트</EventTitle>
          <EventDate>(2025. 05. 07 - 2025. 05. 14)</EventDate>
          <PitdotImage src={pitdotImage} alt="Pitdot" />
          <PromotionText>
            rE: mark 행사 당일<br />
            픽닷 X 이화이언 콜라보 프레임 촬영 인증 시<br />
            <span>강연회 티켓 할인!</span>
          </PromotionText>
        </EventDetails>
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <ScheduleContainer>
          <ScheduleTitle>행사 일시</ScheduleTitle>
          <ScheduleDate>2025.05.07 수요일</ScheduleDate>
          <ScheduleGrid>
            <ScheduleLabel>이벤트 부스</ScheduleLabel>
            <ScheduleTime>11:00 - 16:00</ScheduleTime>
            <ScheduleLabel>강연회 (1부)</ScheduleLabel>
            <ScheduleTime>18:40 - 19:20</ScheduleTime>
            <ScheduleLabel>강연회 (2부)</ScheduleLabel>
            <ScheduleTime>19:20 - 20:40</ScheduleTime>
          </ScheduleGrid>
        </ScheduleContainer>
      </AnimatedSection>

      <AnimatedSection delay={0.8}>
        <LocationContainer>
          <LocationTitle>행사 장소</LocationTitle>
          <LocationText>ECC 지하 4층 이삼봉홀</LocationText>
        </LocationContainer>
      </AnimatedSection>

      <AnimatedSection delay={1.0}>
        <SpeakersContainer>
          <SpeakersTitle>강연자 / 강연명</SpeakersTitle>
          <SpeakerCard>
            <SpeakerImage src={kimSeungWooImage} alt="김승우 교수님" />
            <SpeakerName>이화여자대학교 김승우 교수님</SpeakerName>
            <LecturePart>강연 1부</LecturePart>
            <LectureTitle>&lt;조선의 여성들: 부자유한 시대에 너무나 비범했던&gt;</LectureTitle>
          </SpeakerCard>
          <SpeakerCard>
            <SpeakerImage src={choiJaeCheonImage} alt="최재천 교수님" />
            <SpeakerName>이화여자대학교 최재천 교수님</SpeakerName>
            <LecturePart>강연 2부</LecturePart>
            <LectureTitle>&lt;양심, 공감, 숙론&gt;</LectureTitle>
          </SpeakerCard>
        </SpeakersContainer>
      </AnimatedSection>

      <AnimatedSection delay={1.2}>
        <BoothInfoContainer>
          <BoothInfoTitle>부스 정보</BoothInfoTitle>
          <BoothListItem>01 굿즈 부스</BoothListItem>
          <BoothListItem>02 벗에게 보내는 편지</BoothListItem>
          <BoothListItem>03 럭키드로우</BoothListItem>
          <BoothListItem>04 포토존 (나만의 네컷)</BoothListItem>
        </BoothInfoContainer>
      </AnimatedSection>
    </Container>
  );
};

export default EventIntro;

