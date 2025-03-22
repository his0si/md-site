import React from "react";
import OrderItemCard from "./OrderItemCard";
import { useEffect, useState } from "react";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const tempData = [
      { id: 1, name: "키링", price: "12,000", image: "" },
      { id: 2, name: "머그컵", price: "12,000", image: "" },
      { id: 3, name: "그립톡톡", price: "15,000", image: "" },
      { id: 1, name: "키링", price: "12,000", image: "" },
      { id: 1, name: "키링", price: "12,000", image: "" },
      { id: 1, name: "키링", price: "12,000", image: "" },
      { id: 1, name: "키링", price: "12,000", image: "" },
      { id: 1, name: "키링", price: "12,000", image: "" },
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
