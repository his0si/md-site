import React from "react";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckIcon from "../../assets/CheckIcon.svg"

const ModalInfo = styled.div`
  padding: 0px 0px;
  height: 70%;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TitleContainer = styled.div`
  font-weight: 700;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justity-content: center;
  align-items: center;
  gap: 10px;
`;

const MessageContainer = styled.div`
  font-size: 14px;
`;

const FontLight = styled.div`
  font-weight: 200px;
  color: rgb(74, 71, 71);
`;

const GreenFont = styled.strong`
color: #0D7F54;
font-weight: 700;
`;

const CheckIconContainer = styled.img`
width: 20px;
height: 20px;
`

const OrderModal = ({ modalOpen, setIsModalOpen }) => {
  const bankingNumber = "신한 10-026-784849";
  const navigate = useNavigate();
  const moveButtonHandler = () => {
    // 주문 api 호출
    navigate("/order-complete");
  };
  return (
    <div>
      <Modal
        isOpen={modalOpen}
        moveButtonHandler={moveButtonHandler}
        moveButton={<strong>주문하기</strong>}
        closeButton={<FontLight>주문 취소하기</FontLight>}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalInfo>
          <TitleContainer>
            <CheckIconContainer src={CheckIcon} alt="check-icon"/>
            입금 확인
            </TitleContainer>
          <MessageContainer>
            <GreenFont>이화이언 {bankingNumber}</GreenFont> 로 입금 후<br />{" "}
            주문해주시면 운영진이 확인 후<br />
            상품 수령을 도와드리도록 하겠습니다.
          </MessageContainer>
        </ModalInfo>
      </Modal>
    </div>
  );
};

export default OrderModal;
