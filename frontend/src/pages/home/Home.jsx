import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  background: rgb(248, 250, 243);
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;

  margin: auto;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto; /* ✅ 내부 컨텐츠만 스크롤 가능하게 설정 */
  padding-bottom: 20px; /* 하단 여백 추가 */
`;

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const mockData = [
      { id: 1, name: "봉제인형", price: "10000", status: "available" },
      { id: 2, name: "이화컵", price: "10000", status: "available" },
      { id: 3, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 4, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 5, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 6, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 1, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 1, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 1, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 1, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 1, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 1, name: "굿즈이름", price: "10000", status: "sold-out" },
      { id: 1, name: "굿즈이름", price: "10000", status: "sold-out" },
    ];
    setProducts(mockData);
  }, []);

  return (
    <Container>
      <Header />
      <ScrollableContent>
        <ProductList products={products} />
      </ScrollableContent>
    </Container>
  );
};

export default Home;
