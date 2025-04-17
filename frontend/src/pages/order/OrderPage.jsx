import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import OrderModal from "./OrderModal";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  font-size: 28px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  color: #000;
  line-height: 1;
`;

const GoodsInfo = styled.div`
  display: flex;
  padding: 0 20px 16px;
  gap: 24px;
  margin-top: 40px;
`;

const ImageBox = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  flex-basis: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
  margin-top: 10px;
`;

const GoodsName = styled.div`
  font-size: 15px;
  color: #167d4e;
  margin-bottom: 6px;
  text-align: left;
  font-weight: bold;
`;

const GoodsPrice = styled.div`
  font-size: 15px;
  font-weight: 700;
  text-align: left;
`;

const QtyBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  justify-content: flex-start;
`;

const QtyBtn = styled.button`
  border: 1px solid #e8e8e8;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 20px;
  background: white;
  color: #167d4e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  line-height: 1;
`;

const QtyText = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: 15px;
`;

const Divider = styled.hr`
  margin: 0 20px;
  border: none;
  border-top: 1px solid #e0e0e0;
  width: calc(100% - 40px);
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  font-size: 15px;
  gap: 30px;

  > div:first-child {
    min-width: 100px;
  }
`;

const RowWithThickDivider = styled(Row)`
  position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 20px;
    right: 20px;
    height: 8px;
    background-color: rgb(213, 213, 213);
  }

  strong {
    font-weight: bold;
  }
`;

const RowWithThinDivider = styled(Row)`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    border-top: 1px solid #e0e0e0;
  }
`;

const Input = styled.input`
  padding: 0;
  width: 70%;
  border: none;
  background: transparent;
  font-size: 15px;
  text-align: left;
  outline: none;
  &::placeholder {
    color: #bbb;
  }
`;

const AccountCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 40px 20px 30px;
  margin: 20px 20px;
  text-align: center;
`;

const AccountBox = styled.div`
  font-size: 15px;
  margin-bottom: 60px;
  line-height: 2.5;

  strong {
    font-weight: bold;
  }
`;

const DepositNote = styled.div`
  font-size: 14px;
  color: #167d4e;
`;

const Footer = styled.div`
  width: 100%;
  padding: 0 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderBtn = styled.button`
  background-color: #167d4e;
  color: white;
  padding: 10px 20px;
  border: 1px solid #167d4e;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 320px;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    background-color: #0d5a3a;
    transform: scale(1.05);
  }
`;

const OrderPage = () => {
  const location = useLocation();
  const state = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fallbackItem = {
    id: 0,
    name: "굿즈 이름",
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
    ? Number(String(singleItem?.price).replaceAll(",", "")) * quantity
    : items?.reduce((sum, item) => {
        const price = Number(String(item.price).replaceAll(",", ""));
        return sum + price * (item.quantity ?? 1);
      }, 0);

  //객체배열 수정 시도중
  const formattedProducts = isSingle
    ? [
        {
          productName: singleItem.productName,
          price: Number(String(singleItem.price).replaceAll(",", "")),
          quantity: quantity,
          thumbnailImage: singleItem.thumbnailImage || "",
        },
      ]
    : items.map((item) => ({
        productName: item.productName,
        price: item.price,
        quantity: item.quantity ?? 1,
        thumbnailImage: item.thumbnailImage || "",
      }));

  const goodsTitle =
    items.length === 1
      ? items[0].productName
      : `${items[0].productName} 외 ${items.length - 1}개`;

  const handleQtyChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <CloseButton onClick={() => window.history.back()}>×</CloseButton>
        </Header>

        <GoodsInfo>
          <ImageBox>
            <StyledImg src={singleItem.thumbnailImage} alt="썸네일" />
          </ImageBox>
          <InfoBox>
            <GoodsName>{goodsTitle}</GoodsName>
            <GoodsPrice>
              {Number(singleItem.price).toLocaleString()} 원
            </GoodsPrice>
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
          <RowWithThinDivider>
            <div>입금액</div>
            <div>
              <strong>{totalPrice.toLocaleString()} 원</strong>
            </div>
          </RowWithThinDivider>

          <RowWithThickDivider>
            <div>수령 일자/장소</div>
            <div>
              <strong>25.05.07 ECC 이삼봉홀</strong>
            </div>
          </RowWithThickDivider>

          <RowWithThinDivider>
            <div>연락처</div>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010 - 0000 - 0000"
            />
          </RowWithThinDivider>
        </Summary>

        <AccountCard>
          <AccountBox>
            입금처 계좌번호
            <br />
            <strong>신한은행 100-037-524762 이화이언</strong>
          </AccountBox>
          <DepositNote>
            입금자명은 학번(ex. 217****)으로 입력해주세요!
          </DepositNote>
        </AccountCard>

        <Footer>
          <OrderBtn
            onClick={() => {
              if (!phone || !isValidPhone(phone)) {
                alert("연락처를 정확히 입력해주세요. 예: 010-1234-5678");
                return;
              }
              setIsModalOpen(true);
            }}
          >
            주문하기 (입금 후 클릭해주세요!)
          </OrderBtn>
        </Footer>
      </Wrapper>

      <OrderModal
        modalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        phone={phone}
        products={formattedProducts}
        totalPrice={totalPrice}
      />
    </Container>
  );
};

export default OrderPage;
