import React, { useState } from "react";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ModalInfo = styled.div`
padding: 10px 0px; 
height: 70%;
text-align: center;
justify-content: center;
display : flex;
flex-direction : column;
gap: 15px;
`;

const ProductDetailModal = ({ modalOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(modalOpen);
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        moveButtonHandler={() => {
          navigate("/cart");
        }}
        moveButton={"장바구니 이동하기"}
        closeButton={"계속 구경하기"}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalInfo>
          <p>장바구니에 상품이 담겼습니다.</p>
          <strong>장바구니를 확인하시겠습니까?</strong>
        </ModalInfo>
      </Modal>
    </div>
  );
};

export default ProductDetailModal;
