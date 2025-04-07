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
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0d5a3a;
    transform: scale(1.05);
  }
`;

const Button=({text, onClick })=>{
    return (
        <>
        <ButtonsStyle onClick={onClick}>{text}</ButtonsStyle>
        </>
    )
}

export default Button;