import CartCard from "./CartCard";
import { useState, useEffect } from "react";

const CartList = () => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const tempCart = [
      { id: 1, name: "굿즈 이름", price: "12,000", image: "", quantity: 1 },
      { id: 2, name: "굿즈 이름", price: "12,000", image: "", quantity: 1 },
      { id: 3, name: "굿즈 이름", price: "15,000", image: "", quantity: 1 },
      { id: 4, name: "굿즈 이름", price: "12,000", image: "", quantity: 1 },
      { id: 5, name: "굿즈 이름", price: "12,000", image: "", quantity: 1 },
      { id: 6, name: "굿즈 이름", price: "12,000", image: "", quantity: 1 },
      { id: 7, name: "굿즈 이름", price: "12,000", image: "", quantity: 1 },
      { id: 8, name: "굿즈 이름", price: "12,000", image: "", quantity: 1 },
    ].map((item) => ({ ...item, checked: false }));

    setCartList(tempCart);
  }, []);

  const handleDelete = (id) => {
    setCartList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const handleCheck = (id) => {
    setCartList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  const handleIncrease = (id) => {
    setCartList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const handleDecrease = (id) => {
    setCartList((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const handleCheckAll = () => {
    setCartList((prev) => prev.map((item) => ({ ...item, checked: true })));
  };
  return (
    <div>
      {cartList.map((item) => (
        <CartCard
          key={item.id}
          item={item}
          onDelete={handleDelete}
          onCheck={handleCheck}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      ))}
    </div>
  );
};

export default CartList;
