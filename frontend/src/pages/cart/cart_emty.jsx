import NavBar2 from "../../components/NavBar2";
import styled from "styled-components";

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

const CartEmty=()=>{
    return(
        <>
        <Container>
            <NavBar2/>
        </Container>
        </>
    )
}

export default CartEmty;