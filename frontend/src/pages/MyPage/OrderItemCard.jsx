import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: none;
  padding: 15px;
  margin: 5px auto;
  width: 100%;
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
  flex-shrink: 0;
  flex-basis: 45%; //이미지가 카드 45%너비만 차지하도록 수정
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

const OrderItemCard = ({ item }) => {
  return (
    <Card>
      <ItemImage></ItemImage>
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price}</ItemPrice>
      </ItemInfo>
    </Card>
  );
};

export default OrderItemCard;
