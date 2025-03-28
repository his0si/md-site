import styled from "styled-components";
import React from "react";
import bin from "../../assets/bin.png";

const Card = styled.div`
  border: none;
  display;flex;
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
  aspect-ratio: 1/1;
  background: rgb(245, 245, 245);
  //border-radius: 5px;

  flex-shrink: 0;
  flex-basis: 45%; //이미지가 카드 45%너비만 차지하도록 수정정
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  //justify-content: center;
  margin-top: 10px;
  gap: 10px;
  flex: 1;
`;

const ItemName = styled.div`
  color: #167d4e;
  font-size: 14px;

  font-weight: bold;
  //text-shadow: 0.3px 0 currentColor, -0.3px 0 currentColor;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  color: black;

  font-weight: bold;
`;

//구분

const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  button {
    width: 25px;
    height: 25px;
    object-fit: contain; //  비율 유지 + 정렬

    border: 1.5px solid #167d4e;
    background-color: white;
    color: #167d4e;
    border: none;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: bold;
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
  //margin-left: auto;
  padding: 5px 0;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #167d4e; // 체크 색상 변경
    cursor: pointer;
  }
`;

const DeleteIcon = styled.img`
  width: 25px;
  height: 25px;
  object-fit: contain; //  비율 유지 + 정렬
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const CartCard = ({ item, onDelete, onCheck, onIncrease, onDecrease }) => {
  return (
    <Card>
      <ItemImage></ItemImage>
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price}</ItemPrice>
        <Counter>
          <button onClick={() => onDecrease(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item.id)}>+</button>
        </Counter>
      </ItemInfo>
      <SideArea>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onCheck(item.id)}
        />
        <DeleteIcon src={bin} alt="삭제" onClick={() => onDelete(item.id)} />
      </SideArea>
    </Card>
  );
};

export default CartCard;
