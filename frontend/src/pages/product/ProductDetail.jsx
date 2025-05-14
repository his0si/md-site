import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductDetailModal from "./ProductDetailModal";
import Modal from "../../components/Modal";
import { addToCart } from "../../api/cart";
import { axiosInstance } from "./../../lib/axios";
import { useParams } from "react-router-dom"; //
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  padding-bottom: 120px;
`;

const ProductImage = styled.div`
  width: calc(100% - 40px);
  margin: 60px 20px 20px 20px;
  aspect-ratio: 1;
  background-color: #f5f5f5;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ProductName = styled.h1`
  font-size: 18px;
  margin: 20px 20px 8px 20px;
  color: #167d4e;
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
  img {
    width: 50%; //100%는 너무 큰 것 같아서 사이즈를 줄여보긴 했는데, 조절 가능합니다.
    height: 50%; //100%는 너무 큰 것 같아서 사이즈를 줄여보긴 했는데, 조절 가능합니다.
  }
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
    border: 1px solid #167d4e;

    &:hover {
      background-color: #f5f5f5;
      transform: scale(1.05);
    }
  }

  &.purchase {
    background-color: #167d4e;
    color: white;
    border: 1px solid #167d4e;

    &:hover {
      background-color: #0d5a3a;
      transform: scale(1.05);
    }
  }
`;

const ProductDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("상품 조회 실패:", error);
      }
    };

    fetchProduct(); // 함수 호출
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(productId, 1); // 수량을 1로 고정
      setIsModalOpen(true);
    } catch (error) {
      setAlertMessage(error.message || "장바구니 추가에 실패했습니다.");
      setIsAlertModalOpen(true);
    } finally {
      setLoading(false);
    }
  };
  if (!product) {
    return <p>로딩 중...</p>;
  }

  const handleDirectBuy = async () => {
    try {
      await axiosInstance.get("/login/check-auth");
      const selectedItem = {
        productId: product._id,
        productName: product.productName,
        price: Number(product.price),
        quantity: 1,
        thumbnailImage: product.thumbnailImage,
      };
      navigate("/order-page", {
        state: {
          items: [selectedItem],
          type: "single", // 타입 구분용- 단일상품 주문
        },
      });
    } catch (error) {
      setAlertMessage("로그인 후 이용해주세요!");
      setIsAlertModalOpen(true);
      console.log(error.message);
    }
    
    
  };

  return (
    <Container>
      <ProductImage>
        {product.thumbnailImage ? (
          <img src={product.thumbnailImage} alt={product.productName} />
        ) : (
          <p>이미지를 불러올 수 없습니다.</p>
        )}
      </ProductImage>
      <ProductName>{product.productName}</ProductName>
      <ProductPrice>{product.price}</ProductPrice>
      <ProductStatus>
        {product.detailImage ? (
          <img src={product.detailImage} alt={product.productName} />
        ) : (
          <p>이미지를 불러올 수 없습니다.</p>
        )}
      </ProductStatus>
      <ProductDetailModal
        modalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        {" "}
      </ProductDetailModal>

      <Modal
        isOpen={isAlertModalOpen}
        onClose={() => {
          setIsAlertModalOpen(false);
          if (alertMessage === "로그인 후 이용해주세요!") {
            navigate("/login");
          }
        }}
        closeButton="확인"
      >
        <p>{alertMessage}</p>
      </Modal>

      <ButtonContainer>
        <Button onClick={handleDirectBuy} className="compare">
          바로 구매하기
        </Button>
        <Button onClick={handleAddToCart} className="purchase">
          장바구니에 담기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ProductDetail;
