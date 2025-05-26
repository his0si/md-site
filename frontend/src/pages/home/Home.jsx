import React from "react";
import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import styled from "styled-components";
import { axiosInstance } from "./../../lib/axios";

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
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log("상품 조회 오류" + error.message);
      }
    };

    fetchProducts();
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
