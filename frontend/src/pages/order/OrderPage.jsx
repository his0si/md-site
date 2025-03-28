import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottm: 10px;
`;

const CloseButton = styled.button`
  font-size: 35px;
  border: none;
  background: none;
  cursor: pointer;
`;

const GoodsInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 12px;
  margin-top: 50px;
  padding-left: 20px;
`;

const ImageBox = styled.div`
  width: 140px;
  height: 140px;

  background-color: rgb(245, 245, 245);
`;

const InfoBox = styled.div`
  flex: 1;
  text-align: center;
`;

const GoodsName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #2b6e44;
`;

const GoodsPrice = styled.div`
  font-size: 14px;
  margin: 4px 0;
`;

const QtyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  margin-left: 55px;
  color: #2b6e44;
`;

const QtyBtn = styled.button`
  border: 1px solid #aaa;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 14px;
  background: none;
  color: #2b6e44;
`;

const QtyText = styled.span`
  min-width: 20px;
  text-align: center;
`;

const Divider = styled.hr`
  margin: 5px 0;
  border: none;
  border-top: 1px solid #ddd;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  padding: 6px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: transparent;
`;

const Footer = styled.div`
  margin-top: 20px;
`;

const AccountCard = styled.div`
  border: 1px solid rgb(133, 130, 130);
  border-radius: 12px;
  padding: 24px 16px;

  text-align: center;
  margin-bottom: 13px;
  min-height: 170px;
  line-height: 2;
`;
const AccountBox = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const DepositNote = styled.div`
  font-size: 12px;
  color: #2b6e44;
  text-align: center;
  margin-top: 14px;
`;

const OrderBtn = styled.button`
  background-color: #2b6e44;
  color: white;
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
`;

const OrderPage = () => {
  const location = useLocation();
  const state = location.state || {};

  const fallbackItem = {
    id: 0,
    name: "굿즈이름",
    price: "10,000",
    quantity: 1,
  };

  const type = state.type || "single";
  const isSingle = type === "single";
  const items =
    state.items && state.items.length > 0 ? state.items : [fallbackItem];

  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const singleItem = items?.[0];

  const totalPrice = isSingle
    ? Number(singleItem?.price.replace(",", "")) * quantity
    : items?.reduce((sum, item) => {
        return sum + Number(item.price.replace(",", "")) * item.quantity;
      }, 0);

  const goodsTitle = isSingle
    ? singleItem.name
    : `${items?.[0].name} 외 ${items.length - 1}개`;

  const handleQtyChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={() => window.history.back()}>×</CloseButton>
      </Header>

      <GoodsInfo>
        <ImageBox />
        <InfoBox>
          <GoodsName>{goodsTitle}</GoodsName>
          <GoodsPrice>{singleItem.price} 원</GoodsPrice>
          {isSingle && (
            <QtyBox>
              <QtyBtn onClick={() => handleQtyChange(-1)}>-</QtyBtn>
              <QtyText>{quantity}</QtyText>
              <QtyBtn onClick={() => handleQtyChange(1)}>+</QtyBtn>
            </QtyBox>
          )}
        </InfoBox>
      </GoodsInfo>

      <Divider />

      <Summary>
        <Row>
          입금액{" "}
          <span>
            <strong>{totalPrice.toLocaleString()} 원</strong>
          </span>
        </Row>

        <Divider />

        <Row>
          수령 일자 / 장소{" "}
          <span>
            <strong>25.05.07 ECC 이삼봉홀</strong>
          </span>
        </Row>
        <Divider />
        <Row>
          연락처{" "}
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010 - 0000 - 0000"
          />
        </Row>
      </Summary>

      <Divider />

      <Footer>
        <AccountCard>
          <AccountBox>
            입금처 계좌번호
            <br />
            <strong>32-23425-234929 이화이언</strong>
          </AccountBox>
          <DepositNote>
            입금명은 학번(ex. 217****)으로 입력해주세요!
          </DepositNote>
        </AccountCard>
        <OrderBtn>주문하기 (입금 후 클릭해주세요!)</OrderBtn>
      </Footer>
    </Wrapper>
  );
};

export default OrderPage;
