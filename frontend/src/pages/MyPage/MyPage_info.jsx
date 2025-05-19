import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(256, 256, 256);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-Content: flex-start;
  margin: auto;
  padding-top: 50px;
`;

const Box = styled.div`
  width: 90%;
  height: 150px;
  border-bottom: 1px solid RGB(220, 220, 220);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const MyPage_info= () => {
    return (
      <Container>
        
         <div style={{color:" #167D4E",fontSize:"20px",fontWeight:"700",marginBottom:"4vh",marginTop:"5vh"}}>상품 수령 정보</div>
        <Box>
          <p style={{color:"#167D4E",fontSize:"14px",fontWeight:"700"}}>상품 수령일자</p>
          <p style={{fontSize:"16px",fontWeight:"600"}}>2025.05.07 수요일 10:30~17:00</p>
        </Box>
        <Box>
          <p style={{color:"#167D4E",fontSize:"14px",fontWeight:"700"}}>상품 수령장소</p>
          <p style={{fontSize:"16px",fontWeight:"600"}}>ECC 지하 4층 이삼봉홀</p>
        </Box>
        <Box>
          <p style={{color:"#167D4E",fontSize:"14px",fontWeight:"700"}}>상품 수령방법</p>
          <p style={{fontSize:"16px",fontWeight:"600"}}>굿즈부스의 운영진에게 학번을 말씀해주세요.</p>
        </Box>
      </Container>
    )
  }
  
  export default MyPage_info