import React, { useState } from "react";
import styled from "styled-components";
import ProductDetailModal from "./ProductDetailModal";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  position: relative;
  padding-bottom: 80px;
`;

const ProductImage = styled.div`
  width: calc(100% - 40px);
  margin: 60px 20px 20px 20px;
  aspect-ratio: 1;
  background-color: #f5f5f5;
`;

const ProductName = styled.h1`
  font-size: 18px;
  margin: 20px 20px 8px 20px;
  color: #167D4E;
  font-weight: bold;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  margin: 5px 20px 8px 20px;
  font-weight: bold;
`;

const ProductStatus = styled.p`
  font-size: 14px;
  color: #666;
  margin: 10px 20px 8px 20px;
  width: calc(100% - 40px);
  word-break: break-all; // 글자 단위로 줄바꿈
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.compare {
    background-color: white;
    color: black;
    border: 1px solid #167D4E;
    
    &:hover {
      background-color: #f5f5f5;
      transform: scale(1.05);
    }
  }
  
  &.purchase {
    background-color: #167D4E;
    color: white;
    border: 1px solid #167D4E;
    
    &:hover {
      background-color: #0d5a3a;
      transform: scale(1.05);
    }
  }
`;

const ProductDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Container>
      <ProductImage />
      <ProductName>굿즈 이름</ProductName>
      <ProductPrice>10,000</ProductPrice>
      <ProductStatus>
        testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
      </ProductStatus>
      <ProductDetailModal modalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></ProductDetailModal>
      
      <ButtonContainer>
        <Button className="compare">바로 구매하기</Button>
        <Button onClick={()=>{setIsModalOpen(true)}} className="purchase">장바구니에 담기</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ProductDetail; 