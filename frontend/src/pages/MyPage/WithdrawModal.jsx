import React from "react";
import Modal from "../../components/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { withdrawAPI } from "../../api/user";

const ModalInfo = styled.div`
  padding: 10px 0px;
  height: 70%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const WithdrawModal = ({ modalOpen, setModalOpen }) => {
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    try {
      await withdrawAPI();
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      alert("회원탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      moveButtonHandler={handleWithdraw}
      moveButton={"탈퇴하기"}
      closeButton={"취소"}
      onClose={() => setModalOpen(false)}
    >
      <ModalInfo>
        <p>정말로 회원 탈퇴하시겠습니까?</p>
        <strong>이 작업은 되돌릴 수 없습니다.</strong>
      </ModalInfo>
    </Modal>
  );
};

export default WithdrawModal;
