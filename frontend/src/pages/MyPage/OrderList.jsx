import React from "react";
import OrderItemCard from "./OrderItemCard";
import { useEffect, useState } from "react";

import { getAllOrders } from "../../api/order";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        console.log("주문목록", res); //확인용으로 일단 작성함
        setOrderList(res);
      } catch (err) {
        console.log("주문목록 불러오기 실패함", err);
      }
    };

    fetchOrders();
  }, []);

  // useEffect(() => {
  //   const tempData = [
  //     { id: 1, name: "굿즈 이름", price: "12,000", image: "" },
  //     { id: 2, name: "굿즈 이름", price: "12,000", image: "" },
  //     { id: 3, name: "그굿즈 이름", price: "15,000", image: "" },
  //     { id: 4, name: "굿즈 이름", price: "12,000", image: "" },
  //     { id: 5, name: "굿즈 이름", price: "12,000", image: "" },
  //     { id: 6, name: "굿즈 이름", price: "12,000", image: "" },
  //     { id: 7, name: "굿즈 이름", price: "12,000", image: "" },
  //     { id: 8, name: "굿즈 이름", price: "12,000", image: "" },
  //   ];

  //   setOrderList(tempData);
  // }, []);

  return (
    <div>
      {orderList.map((order, orderIdx) =>
        Array.isArray(order.products)
          ? order.products.map((product, productIdx) => (
              <OrderItemCard key={`${orderIdx}-${productIdx}`} item={product} />
            ))
          : null
      )}
    </div>
  );
};

export default OrderList;
