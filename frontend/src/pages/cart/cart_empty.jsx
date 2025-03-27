import NavBar2 from "../../components/NavBar2";
import styled from "styled-components";
import Button from "../../components/button";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(248, 250, 243);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-Content: center;
  margin: auto;
`;

const CartEmpty=()=>{
    return(
        <>
        <Container>
            <NavBar2/>
            <div style={{textAlign:"center"}}>장바구니가 비었습니다 <br/> 마음에 드는 상품으로 장바구니를 채워 주세요!</div>
            <Button text={"마켓구경하기"}/>
        </Container>
        </>
    )
}

export default CartEmpty;