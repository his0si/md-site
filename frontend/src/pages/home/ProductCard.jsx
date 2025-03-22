import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: none;
  padding: 15px;
  margin: 5px auto;
  width: 90%;
  background: rgb(248, 250, 243);
  // align-items: center;
  display: flex;

  gap: 10px;
  border-bottom: 1px solid rgb(211, 211, 211);
`;

const ProductImage = styled.div`
  width: 150px;
  height: 150px;
  background: rgb(245, 245, 245);
  border-radius: 5px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  gap: 20px;
`;

const ProductName = styled.div`
  color: green;
  font-size: 20px;
  font-weight: bold;
`;

const ProductPrice = styled.div`
  font-size: 14px;
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
      <ProductImage>+</ProductImage>
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
