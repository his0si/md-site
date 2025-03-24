import React from "react";
import OrderItemCard from "./OrderItemCard";
import { useEffect, useState } from "react";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const tempData = [
      { id: 1, name: "굿즈 이름", price: "12,000", image: "" },
      { id: 2, name: "굿즈 이름", price: "12,000", image: "" },
      { id: 3, name: "그굿즈 이름", price: "15,000", image: "" },
      { id: 4, name: "굿즈 이름", price: "12,000", image: "" },
      { id: 5, name: "굿즈 이름", price: "12,000", image: "" },
      { id: 6, name: "굿즈 이름", price: "12,000", image: "" },
      { id: 7, name: "굿즈 이름", price: "12,000", image: "" },
      { id: 8, name: "굿즈 이름", price: "12,000", image: "" },
    ];

    setOrderList(tempData);
  }, []);

  return (
    <div>
      {orderList.map((item) => (
        <OrderItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default OrderList;
