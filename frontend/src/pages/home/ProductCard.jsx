import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: none;
  padding: 15px;
  margin: 5px auto;
  width: 90%;
  background: rgb(255, 255, 255);
  // align-items: center;
  display: flex;

  gap: 15px;
  border-bottom: 1px solid rgb(211, 211, 211);
`;

const ProductImage = styled.div`
  width: 170px;
  aspect-ratio: 1/1;
  background: rgb(245, 245, 245);

  flex-shrink: 0;
  flex-basis: 50%; //이미지가 카드 45%너비만 차지하도록 수정정
  //border-radius: 5px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  //justify-content: center;
  margin-top: 10px;
  gap: 10px;
  flex: 1;
`;

const ProductName = styled.div`
  color: #167d4e;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  color: black;

  font-weight: bold;
`;

const ProductStatus = styled.div`
  color: red;
  font-weight: bold;
`;

const ProductCard = ({ product }) => {
  return (
    <Card>
      <ProductImage></ProductImage>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price}</ProductPrice>
        {product.status === "sold-out" && (
          <ProductStatus>매진임박!</ProductStatus>
        )}
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;
