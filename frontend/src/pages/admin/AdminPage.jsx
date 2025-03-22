import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color:rgb(255, 255, 255);
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

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin: 0;
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
  background-color: ${props => props.paid ? '#e6f4ea' : '#fce8e6'};
  color: ${props => props.paid ? '#167D4E' : '#c5221f'};
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
  const [orders, setOrders] = useState([
    {
      id: 1,
      studentId: '20240001',
      goodsName: 'rE: market 티셔츠',
      quantity: 2,
      isPaid: true,
      pickupDate: '2024-03-20',
      isPickedUp: false
    },
    // 더미 데이터
  ]);

  const handleStatusChange = (orderId, field) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, [field]: !order[field] }
        : order
    ));
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>주문 관리</Title>
        </Header>
        <Table>
          <thead>
            <tr>
              <Th>학번</Th>
              <Th>굿즈 이름</Th>
              <Th>주문 개수</Th>
              <Th>입금 여부</Th>
              <Th>수령 날짜</Th>
              <Th>수령 여부</Th>
              <Th>관리</Th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <Td>{order.studentId}</Td>
                <Td>{order.goodsName}</Td>
                <Td>{order.quantity}</Td>
                <Td>
                  <StatusBadge paid={order.isPaid}>
                    {order.isPaid ? '입금완료' : '미입금'}
                  </StatusBadge>
                </Td>
                <Td>{order.pickupDate}</Td>
                <Td>
                  <StatusBadge paid={order.isPickedUp}>
                    {order.isPickedUp ? '수령완료' : '미수령'}
                  </StatusBadge>
                </Td>
                <Td>
                  <ActionButton onClick={() => handleStatusChange(order.id, 'isPaid')}>
                    입금상태 변경
                  </ActionButton>
                  <ActionButton onClick={() => handleStatusChange(order.id, 'isPickedUp')}>
                    수령상태 변경
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default AdminPage; 