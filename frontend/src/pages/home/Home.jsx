import React from "react";
// import { useState, useEffect } from "react";
import Header from "./Header";
// import ProductList from "./ProductList";
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
const Home = () => {
  // const [products, setProducts] = useState([]);
  // // useEffect(()=>{
  //   const mockData=[
  // {id:1, name}
  //
  // ];

  //   }
  //   })

  return (
    <Container>
      <Header />
      <Header />
      <Header />
      <Header />
      <Header />
      <Header />

      {/* <ProductList products={products} /> */}
      <h1>just in the process</h1>
    </Container>
  );
};

export default Home;
