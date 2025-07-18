import React, { useState } from "react";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckIcon from "../../assets/CheckIcon.svg";
import { createOrder } from "../../api/order";

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
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MessageContainer = styled.div`
  font-size: 14px;
`;

const FontLight = styled.div`
  font-weight: 200;
  color: rgb(74, 71, 71);
`;

const GreenFont = styled.strong`
  color: #0d7f54;
  font-weight: 700;
`;

const CheckIconContainer = styled.img`
  width: 20px;
  height: 20px;
`;

const ErrorMessageContainer = styled.div`
  color: red;
  padding: 20px;
  font-size: 16px;
  text-align: center;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OrderModal = ({
  modalOpen,
  setIsModalOpen,
  phone,
  products,
  totalPrice,
}) => {
  const bankingNumber = "신한 100-037-524762";
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmOrder = async () => {
    console.log("formattedproducts확인용, formattedProducts");
    console.log("formattedProducts 확인용용", products);
    console.log(" !!products:", products); //확인용용
    console.log(" !! totalPrice:", totalPrice); //확인용용
    console.log("주문버튼 클릭됨"); //확인용용
    try {
      const formattedProducts = products.map((item) => ({
        ...item,
        price: Number(String(item.price).replaceAll(",", "")),
      }));
      const res = await createOrder(
        phone,
        formattedProducts,
        totalPrice,
        "결제확인중"
      );
      console.log("주문 생성 성공:", res);
      navigate("/order-complete");
    } catch (err) {
      console.error("주문 생성 실패:", err);
      setErrorMessage("주문생성에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        moveButtonHandler={errorMessage ? null : handleConfirmOrder}
        moveButton={errorMessage ? null : <strong>주문하기</strong>}
        closeButton={<FontLight>{errorMessage ? "닫기" : "주문 취소하기"}</FontLight>}
        onClose={handleCloseModal}
      >
        {errorMessage ? (
          <ErrorMessageContainer>
            {errorMessage}
          </ErrorMessageContainer>
        ) : (
          <ModalInfo>
            <TitleContainer>
              <CheckIconContainer src={CheckIcon} alt="check-icon" />
              입금 확인
            </TitleContainer>
            <MessageContainer>
              <GreenFont>이화이언 {bankingNumber}</GreenFont> 로 입금 후<br />{" "}
              주문해주시면 운영진이 확인 후<br />
              상품 수령을 도와드리도록 하겠습니다.
            </MessageContainer>
          </ModalInfo>
        )}
      </Modal>
    </div>
  );
};

export default OrderModal;
