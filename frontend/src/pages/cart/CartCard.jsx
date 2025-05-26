import styled from "styled-components";
import React from "react";
import bin from "../../assets/bin.png";
import { useNavigate } from "react-router-dom";

// 카드 컨테이너 스타일
const Card = styled.div`
  border: none;
  display: flex;
  padding: 15px;
  margin: 5px auto;
  width: 90%;
  background: #fff;
  gap: 15px;
  border-bottom: 1px solid #d3d3d3;
`;

// 이미지 영역 스타일
const ItemImage = styled.div`
  width: 170px;
  aspect-ratio: 1/1;
  background: #f5f5f5;
  flex-shrink: 0;
  flex-basis: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 클릭 가능 표시 */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

// 정보 영역 스타일
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 10px;
  gap: 10px;
  flex: 1;
`;

// 상품명 스타일
const ItemName = styled.div`
  color: #167d4e;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer; /* 클릭 가능 표시 */
`;

// 가격 스타일
const ItemPrice = styled.div`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;

// 수량 조절 버튼 스타일
const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  button {
    width: 25px;
    height: 25px;
    border: none;
    background: #fff;
    font-size: 16px;
    font-weight: bold;
    border: 1.5px solid #167d4e;
    border-radius: 4px;
    cursor: pointer;
  }
  span {
    font-weight: bold;
    font-size: 16px;
  }
`;

// 우측 체크박스+삭제 영역 스타일
const SideArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #167d4e;
    cursor: pointer;
  }
`;

// 삭제 아이콘 스타일
const DeleteIcon = styled.img`
  width: 25px;
  height: 25px;
  object-fit: contain;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;

const CartCard = ({ item, onDelete, onCheck, onIncrease, onDecrease }) => {
  const navigate = useNavigate();

  // 상세 페이지로 이동
  const goToDetail = () => {
    navigate(`/product-detail/${item.id}`);
  };

  return (
    <Card>
      {/* 상품 이미지 클릭 시 상세 이동 */}
      <ItemImage onClick={goToDetail}>
        <img src={item.thumbnailImage} alt={item.productName} />
      </ItemImage>

      <ItemInfo>
        {/* 상품명 클릭 시 상세 이동 */}
        <ItemName onClick={goToDetail}>
          {item.productName}
        </ItemName>

        <ItemPrice>
          {Number(item.price).toLocaleString()}원
        </ItemPrice>

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
        <DeleteIcon
          src={bin}
          alt="삭제"
          onClick={() => onDelete(item.id)}
        />
      </SideArea>
    </Card>
  );
};

export default CartCard;
