import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, thumbnails  }) => {
  return (
    <div>
      {products.map((product,index) => (
        <ProductCard key={product._id} product={product} thumbnail={thumbnails[index]}/>
      ))}
    </div>
  );
};

export default ProductList;
