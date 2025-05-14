import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 85vw;
  height: 32vh;
  max-width: 400px;
  max-height: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%),
    linear-gradient(270deg, #bcdfca 0%, #fffdea 100%);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${({ hasSingleButton }) => (hasSingleButton ? "center" : "space-between")};
`;

const MoveButton = styled.button`
  width: ${({ isSingle }) => (isSingle ? "100%" : "50%")};
  padding: 10px 12px;
  background: 0;
  color: white;
  border: 0;
  cursor: pointer;
  color: #167d4e;
`;

const CloseButton = styled.button`
  width: ${({ isSingle }) => (isSingle ? "100%" : "50%")};
  padding: 10px 12px;
  background: 0;
  color: white;
  border: 0;
  cursor: pointer;
  color: #167d4e;
`;

const Modal = ({
  isOpen,
  onClose,
  children,
  moveButton,
  moveButtonHandler,
  closeButton,
}) => {
  const hasMoveButton = !!moveButton;
  const hasCloseButton = !!closeButton;
  const hasSingleButton = (hasMoveButton && !hasCloseButton) || (!hasMoveButton && hasCloseButton);

  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <ButtonContainer hasSingleButton={hasSingleButton}>
          {hasCloseButton && (
            <CloseButton onClick={onClose} isSingle={hasSingleButton}>
              {closeButton}
            </CloseButton>
          )}
          {hasMoveButton && (
            <MoveButton onClick={moveButtonHandler} isSingle={hasSingleButton}>
              {moveButton}
            </MoveButton>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
