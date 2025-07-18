import React, { useState } from "react";
import styled from "styled-components";
import CartList from "./CartList";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "./../../lib/axios";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  margin: auto;
  min-height: 100vh;
  position: relative;
`;

const Title = styled.h2`
  font-size: 20px;
  text-align: center;
  font-weight: 800;
  color: #167d4e;
  padding: 20px 0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 0 70px 0;

  /* 스크롤바 숨기기: 크로스 브라우징 처리 */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
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

const EmptyCartButton = styled.button`
  background-color: #167d4e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0d5a3a;
    transform: translateX(-50%) scale(1.05);
  }
`;

const Cart = () => {
  const [cartEmpty, setCartEmpty] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchGetCart = async () => {
      try {
        const res = await axiosInstance.get("/cart");
        // 성공적으로 장바구니 받아옴 → 비었는지는 데이터로 판단 가능
        if (res.data.length === 0) {
          setCartEmpty(true);
        } else {
          setCartEmpty(false);
        }
      } catch (error) {
        // 여기서 상태 코드로 분기
        if (error.response) {
          if (error.response.status === 401) {
            navigate("/login");
          } else if (error.response.status === 404) {
            setCartEmpty(true);
          }
        } else {
          console.error("요청 실패:", error.message);
        }
      }
    };

    fetchGetCart();
  }, []);

  const api = axios.create({
    baseURL: "/api", // 프록시 설정을 통해 /api로 시작하는 요청은 백엔드로 전달됨
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleSelectedChange = (items) => {
    setSelectedItems(items);
  };

  const handleSelectOrder = () => {
    if (selectedItems.length === 0) {
      setModalMessage("주문할 상품을 선택해주세요");
      setIsModalOpen(true);
      return;
    }

    const formattedItems = selectedItems.map((item) => ({
      id: item.productId,
      productId: item.productId,
      productName: item.productName,
      price: Number(String(item.price).replaceAll(",", "")),
      quantity: item.quantity ?? 1,
      thumbnailImage: item.thumbnailImage || "",
    }));

    //console.log("** 선택 상품 formattedItems 확인용:", formattedItems);
    console.log("*** 선택된 selectedItems 원본:", selectedItems);

    navigate("/order-page", {
      state: {
        items: formattedItems,
        type: "multi",
      },
    });
  };

  const handleOrderAll = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      console.log("cart응답 내용:", res.data); //오류 확인용
      const cartItems = res.data.data;

      if (cartItems.length === 0) {
        setModalMessage("장바구니가 비어있습니다");
        setIsModalOpen(true);
        return;
      }

      const formattedItems = cartItems.map((item) => ({
        id: item.productID,
        productId: item.productID,
        productName: item.productName,
        price: Number(String(item.price).replaceAll(",", "")),
        quantity: item.quantity ?? 1,
        thumbnailImage: item.thumbnailImage || "",
      }));

      navigate("/order-page", {
        state: {
          items: formattedItems,
          type: "multi",
        },
      });
    } catch (error) {
      console.log("전체주문에러", error);
      setModalMessage("장바구니 전체 정보를 불러오지 못했습니다");
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {cartEmpty ? (
        <Container>
          <div
            style={{
              textAlign: "center",
              marginBottom: "20vh",
              marginTop: "40vh",
              fontSize: "15px",
            }}
          >
            장바구니가 비었습니다 <br /> 마음에 드는 상품으로 장바구니를 채워
            주세요!
          </div>
          <EmptyCartButton onClick={() => navigate("/")}>
            마켓구경하기
          </EmptyCartButton>
        </Container>
      ) : (
        <Container>
          <Title>장바구니</Title>
          <ScrollArea>
            <CartList onSelectionChange={handleSelectedChange} />
          </ScrollArea>
          <ButtonContainer>
            <Button onClick={handleOrderAll} className="compare">
              전체 상품 주문하기
            </Button>
            <Button onClick={handleSelectOrder} className="purchase">
              선택 상품 주문하기
            </Button>
          </ButtonContainer>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            closeButton="확인"
          >
            <p>{modalMessage}</p>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default Cart;
