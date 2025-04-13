import React from "react";
import OrderItemCard from "./OrderItemCard";
import { useEffect, useState } from "react";
import { getOrderCheck } from "../../api/order";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const data = await getOrderCheck();
        setOrderList(data);
      } catch (error) {
        console.log("주문목록 불러오기 실패함", error);
      }
    };

    fetchOrderList();
  }, []);

  return (
    <div>
      {orderList.map((item, index) => (
        <OrderItemCard key={`${item.productName}-${index}`} item={item} />
      ))}
    </div>
  );
};

export default OrderList;
