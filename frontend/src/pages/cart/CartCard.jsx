import styled from "styled-components";
import React from "react";
import bin from "../../assets/bin.png";

const Card = styled.div`
  border: none;
  padding: 15px;
  margin: 5px auto;
  width: 90%;
  background: rgb(255, 255, 255);
  // align-items: center;
  display: flex;

  gap: 15px;
  border-bottom: 1px solid rgb(211, 211, 211);
`;

const ItemImage = styled.div`
  width: 170px;
  height: 170px;
  background: rgb(245, 245, 245);
  //border-radius: 5px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  //justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

const ItemName = styled.div`
  color: #167d4e;
  font-size: 17px;

  font-weight: bold;
  text-shadow: 0.3px 0 currentColor, -0.3px 0 currentColor;
`;

const ItemPrice = styled.div`
  font-size: 20px;
  color: black;

  font-weight: bold;
`;

//구분

const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    background-color: #167d4e;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  span {
    font-weight: bold;
    font-size: 16px;
  }
`;

const SideArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  padding: 5px 0;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #167d4e; // 체크 색상 변경
    cursor: pointer;
  }
`;

const DeleteIcon = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const CartCard = ({ item }) => {
  return (
    <Card>
      <ItemImage></ItemImage>
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price}</ItemPrice>
        <Counter>
          <button>-</button>
          <span>{item.quantity}</span>
          <button>+</button>
        </Counter>
      </ItemInfo>
      <SideArea>
        <input type="checkbox" />
        <DeleteIcon src={bin} alt="삭제" />
      </SideArea>
    </Card>
  );
};

export default CartCard;
