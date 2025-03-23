import CartCard from "./CartCard";
import { useState, useEffect } from "react";

const CartList = () => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const tempCart = [
      { id: 1, name: "키링", price: "12,000", image: "", quantity: 1 },
      { id: 2, name: "머그컵", price: "12,000", image: "", quantity: 1 },
      { id: 3, name: "그립톡톡", price: "15,000", image: "", quantity: 1 },
      { id: 4, name: "키링", price: "12,000", image: "", quantity: 1 },
      { id: 5, name: "키링", price: "12,000", image: "", quantity: 1 },
      { id: 6, name: "키링", price: "12,000", image: "", quantity: 1 },
      { id: 7, name: "키링", price: "12,000", image: "", quantity: 1 },
      { id: 8, name: "키링", price: "12,000", image: "", quantity: 1 },
    ];

    setCartList(tempCart);
  }, []);

  return (
    <div>
      {cartList.map((item) => (
        <CartCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartList;
