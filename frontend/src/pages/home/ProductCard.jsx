import React from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";

const Card = styled.div`
  border: none;
  padding: 15px 8px;
  margin: 5px 0 5px 0;
  width: 95%;
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
  flex-basis: 45%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지 비율 유지하면서 영역 꽉 채우기 */
    border-radius: 5px; /* 원하면 라운딩 효과도 */
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
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
  color: #ff0000;
`;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleProductDetail = () => {
    navigate(`/product-detail/${product._id}`);
  };
  return (
    <Card onClick={handleProductDetail}>
      <ProductImage>
        <img src={product.thumbnailImage} />
      </ProductImage>
      <ProductInfo>
        <ProductName>{product.productName}</ProductName>
        <ProductPrice>{Number(product.price).toLocaleString()}</ProductPrice>
        {product.stock <= 5 && <ProductStatus>매진임박!</ProductStatus>}
      </ProductInfo>
    </Card>
  );
};

export default ProductCard;
