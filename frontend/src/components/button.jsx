import styled from "styled-components";

const ButtonsStyle = styled.button`
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

const Button=({text})=>{
    return (
        <>
        <ButtonsStyle>{text}</ButtonsStyle>
        </>
    )
}

export default Button;