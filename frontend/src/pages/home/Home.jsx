import React from "react";
import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 0 16px;
  position: relative;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 60px 0 20px 0;
  height: 100%;
  position: relative;

  /* 스크롤바 숨기기: 크로스 브라우징 처리 */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const mockData = [
      { id: 1, name: "봉제인형", price: "10,000", status: "available" },
      { id: 2, name: "이화컵", price: "10,000", status: "available" },
      { id: 3, name: "굿즈이름", price: "10,000", status: "sold-out" },
      { id: 4, name: "굿즈이름", price: "10,000", status: "sold-out" },
      { id: 5, name: "굿즈이름", price: "10,000", status: "sold-out" },
      { id: 6, name: "굿즈이름", price: "10,000", status: "available" },
      { id: 7, name: "굿즈이름", price: "10,000", status: "sold-out" },
      { id: 8, name: "굿즈이름", price: "10,000", status: "available" },
      { id: 9, name: "굿즈이름", price: "10,000", status: "sold-out" },
      { id: 10, name: "굿즈이름", price: "10,000", status: "available" },
      { id: 11, name: "굿즈이름", price: "10,000", status: "available" },
      { id: 12, name: "굿즈이름", price: "10,000", status: "available" },
      { id: 13, name: "굿즈이름", price: "10,000", status: "sold-out" },
    ];
    setProducts(mockData);
  }, []);

  return (
    <Container>
      <ScrollableContent>
        <ProductList products={products} />
      </ScrollableContent>
    </Container>
  );
};

export default Home;
