// AdminPage.js
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { orderAdmin } from '../../api/order';
import { updatePaymentStatus, updateReceivedStatus } from '../../api/admin';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: rgb(255, 255, 255);
  }
`;

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: #167D4E;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  background-color: ${props => props.primary ? '#e6f4ea' : '#fce8e6'};
  color: ${props => props.primary ? '#167D4E' : '#c5221f'};
`;

const ActionButton = styled.button`
  background-color: #167D4E;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  
  &:hover {
    background-color: #0d5a3a;
  }
`;

const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await orderAdmin();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  // 결제 상태 변경: 결제 상태를 '결제완료'와 '결제확인중' 사이에서 토글합니다.
  const handlePaymentStatusChange = async (orderId, currentStatus) => {
    const newStatus = currentStatus === '결제완료' ? '결제확인중' : '결제완료';
    try {
      await updatePaymentStatus(orderId, newStatus);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('결제 상태 변경 실패:', error);
    }
  };

  // 수령 상태 변경: 수령 상태를 true(수령완료)와 false(미수령) 사이에서 토글합니다.
  const handleReceivedStatusChange = async (orderId, currentReceived) => {
    const newReceived = !currentReceived;
    try {
      await updateReceivedStatus(orderId, newReceived);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, received: newReceived } : order
        )
      );
    } catch (error) {
      console.error('수령 상태 변경 실패:', error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <h2>주문 관리</h2>
        </Header>
        <Table>
          <thead>
            <tr>
              <Th>학번</Th>
              <Th>굿즈 이름</Th>
              <Th>주문 개수</Th>
              <Th>입금 여부</Th>
              <Th>주문 날짜</Th>
              <Th>수령 여부</Th>
              <Th>관리</Th>
            </tr>
          </thead>
          <tbody>
            {orders.flatMap((order, orderIndex) =>
              order.products.map((product, productIndex) => (
                <tr key={`${order.user.studentId}-${orderIndex}-${productIndex}`}>
                  <Td>{order.user.studentId}</Td>
                  <Td>{product.productName}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>
                    <StatusBadge primary={order.status === '결제완료'}>
                      {order.status}
                    </StatusBadge>
                  </Td>
                  <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <StatusBadge primary={order.received === true}>
                      {order.received ? '수령완료' : '미수령'}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <ActionButton onClick={() => handlePaymentStatusChange(order.orderId, order.status)}>
                      입금상태 변경
                    </ActionButton>
                    <ActionButton onClick={() => handleReceivedStatusChange(order.orderId, order.received)}>
                      수령상태 변경
                    </ActionButton>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AdminPage;
