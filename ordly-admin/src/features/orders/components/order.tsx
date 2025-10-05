'use client';

import { useState } from 'react';
import { Order } from '@/types/types';
import OrderStatus from './order-status';
import OrderModal from './order-modal';

const initialSampleOrders: Order[] = [
  {
    id: '1',
    tableNumber: 3,
    orderNumber: 101,
    totalPrice: '21,000',
    status: '취소',
    items: [
      { id: 'i1', name: '후라이드 치킨', quantity: 1, price: '18,000' },
      { id: 'i2', name: '콜라 1.5L', quantity: 1, price: '3,000' },
    ],
    createdAt: '2024-05-28T10:30:00Z',
  },
  {
    id: '2',
    tableNumber: 5,
    orderNumber: 102,
    totalPrice: '24,500',
    status: '준비중',
    items: [
      { id: 'i3', name: '양념 치킨', quantity: 1, price: '19,000' },
      { id: 'i4', name: '치즈볼 (5개)', quantity: 1, price: '5,500' },
    ],
    createdAt: '2024-05-28T10:32:00Z',
  },
  {
    id: '3',
    tableNumber: 1,
    orderNumber: 103,
    totalPrice: '32,000',
    status: '준비중',
    items: [
      { id: 'i5', name: '페퍼로ни 피자', quantity: 1, price: '25,000' },
      { id: 'i6', name: '사이다 1.5L', quantity: 1, price: '3,000' },
      { id: 'i7', name: '갈릭 디핑 소스', quantity: 2, price: '2,000' },
      { id: 'i8', name: '핫소스', quantity: 2, price: '2,000' },
    ],
    createdAt: '2024-05-28T10:35:00Z',
  },
  {
    id: '4',
    tableNumber: 8,
    orderNumber: 104,
    totalPrice: '15,000',
    status: '조리중',
    items: [{ id: 'i9', name: '까르보나라 파스타', quantity: 1, price: '15,000' }],
    createdAt: '2024-05-28T10:38:00Z',
  },
  {
    id: '5',
    tableNumber: 2,
    orderNumber: 105,
    totalPrice: '38,000',
    status: '조리중',
    items: [
      { id: 'i10', name: '콤비네이션 피자', quantity: 1, price: '26,000' },
      { id: 'i11', name: '오븐 스파게티', quantity: 1, price: '12,000' },
    ],
    createdAt: '2024-05-28T10:25:00Z',
  },
  {
    id: '6',
    tableNumber: 7,
    orderNumber: 106,
    totalPrice: '20,000',
    status: '조리중',
    items: [{ id: 'i12', name: '반반 치킨 (후라이드/양념)', quantity: 1, price: '20,000' }],
    createdAt: '2024-05-28T10:28:00Z',
  },
  {
    id: '7',
    tableNumber: 4,
    orderNumber: 107,
    totalPrice: '22,000',
    status: '조리중',
    items: [{ id: 'i13', name: '마르게리따 피자', quantity: 1, price: '22,000' }],
    createdAt: '2024-05-28T10:15:00Z',
  },
  {
    id: '8',
    tableNumber: 6,
    orderNumber: 108,
    totalPrice: '18,000',
    status: '완료',
    items: [
      { id: 'i14', name: '알리오 올리오', quantity: 1, price: '14,000' },
      { id: 'i15', name: '마늘빵', quantity: 1, price: '4,000' },
    ],
    createdAt: '2024-05-28T10:20:00Z',
  },
  {
    id: '9',
    tableNumber: 9,
    orderNumber: 109,
    totalPrice: '24,000',
    status: '완료',
    items: [
      { id: 'i16', name: '간장 치킨', quantity: 1, price: '19,000' },
    ],
    createdAt: '2024-05-28T10:22:00Z',
  },
  {
    id: '10',
    tableNumber: 10,
    orderNumber: 110,
    totalPrice: '12,000',
    status: '완료',
    items: [{ id: 'i18', name: '먹태', quantity: 1, price: '12,000' }],
    createdAt: '2024-05-28T10:05:00Z',
  },
    {
    id: '11',
    tableNumber: 3,
    orderNumber: 111,
    totalPrice: '31,000',
    status: '준비중',
    items: [
      { id: 'i19', name: '불고기 피자', quantity: 1, price: '27,000' },
      { id: 'i20', name: '생맥주 500cc', quantity: 1, price: '4,000' },
    ],
    createdAt: '2024-05-28T10:40:00Z',
  },
  {
    id: '12',
    tableNumber: 5,
    orderNumber: 112,
    totalPrice: '29,000',
    status: '조리중',
    items: [
      { id: 'i21', name: '포테이토 피자', quantity: 1, price: '24,000' },
      { id: 'i22', name: '소주', quantity: 1, price: '5,000' },
    ],
    createdAt: '2024-05-28T10:42:00Z',
  },
  {
    id: '13',
    tableNumber: 2,
    orderNumber: 113,
    totalPrice: '52,000',
    status: '완료',
    items: [
      { id: 'i23', name: '마늘간장치킨', quantity: 1, price: '20,000' },
      { id: 'i24', name: '핫크리스피치킨', quantity: 1, price: '19,000' },
      { id: 'i25', name: '감자튀김', quantity: 1, price: '8,000' },
      { id: 'i26', name: '콜라 1.5L', quantity: 1, price: '3,000' },
      { id: 'i27', name: '사이다 1.5L', quantity: 1, price: '2,000' },
    ],
    createdAt: '2024-05-28T10:45:00Z',
  },
  {
    id: '14',
    tableNumber: 8,
    orderNumber: 114,
    totalPrice: '16,000',
    status: '조리중',
    items: [
      { id: 'i28', name: '로제 파스타', quantity: 1, price: '16,000' }
    ],
    createdAt: '2024-05-28T10:48:00Z',
  },
  {
    id: '15',
    tableNumber: 1,
    orderNumber: 115,
    totalPrice: '45,000',
    status: '완료',
    items: [
      { id: 'i29', name: '고르곤졸라 피자', quantity: 1, price: '23,000' },
      { id: 'i30', name: '토마토 스파게티', quantity: 1, price: '13,000' },
      { id: 'i31', name: '샐러드', quantity: 1, price: '9,000' },
    ],
    createdAt: '2024-05-28T10:50:00Z',
  },
  {
    id: '16',
    tableNumber: 6,
    orderNumber: 116,
    totalPrice: '27,000',
    status: '취소',
    items: [
        { id: 'i32', name: '페퍼로니 피자', quantity: 1, price: '25,000' },
        { id: 'i33', name: '핫소스', quantity: 1, price: '2,000' },
    ],
    createdAt: '2024-05-28T10:51:00Z',
  },
  {
    id: '17',
    tableNumber: 4,
    orderNumber: 117,
    totalPrice: '38,000',
    status: '준비중',
    items: [
        { id: 'i34', name: '반반 치킨 (후라이드/양념)', quantity: 1, price: '20,000' },
        { id: 'i35', name: '생맥주 500cc', quantity: 2, price: '8,000' },
        { id: 'i36', name: '치즈볼 (5개)', quantity: 2, price: '10,000' },
    ],
    createdAt: '2024-05-28T10:55:00Z',
  },
    {
    id: '18',
    tableNumber: 10,
    orderNumber: 118,
    totalPrice: '52,000',
    status: '조리중',
    items: [
      { id: 'i37', name: '콤비네이션 피자', quantity: 2, price: '52,000' },
    ],
    createdAt: '2024-05-28T10:58:00Z',
  },
  {
    id: '19',
    tableNumber: 7,
    orderNumber: 119,
    totalPrice: '19,000',
    status: '완료',
    items: [
      { id: 'i38', name: '핫크리스피치킨', quantity: 1, price: '19,000' },
    ],
    createdAt: '2024-05-28T11:01:00Z',
  },
  {
    id: '20',
    tableNumber: 9,
    orderNumber: 120,
    totalPrice: '42,000',
    status: '준비중',
    items: [
      { id: 'i39', name: '알리오 올리오', quantity: 1, price: '14,000' },
      { id: 'i40', name: '마르게리따 피자', quantity: 1, price: '22,000' },
      { id: 'i41', name: '마늘빵', quantity: 1, price: '4,000' },
      { id: 'i42', name: '콜라 1.5L', quantity: 1, price: '2,000' },
    ],
    createdAt: '2024-05-28T11:05:00Z',
  },
];

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>(initialSampleOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const pendingOrders = sortedOrders.filter((o) => o.status === '준비중');
  const cookingOrders = sortedOrders.filter((o) => o.status === '조리중');
  const doneOrders = sortedOrders.filter((o) => o.status === '완료' || o.status === '취소');

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-2 lg:p-4 flex-grow overflow-auto'>
        <OrderStatus
          title='주문완료'
          orders={pendingOrders}
          onOpenModal={handleOpenModal}
          onUpdateStatus={handleUpdateOrderStatus}
        />
        <OrderStatus
          title='조리중'
          orders={cookingOrders}
          onOpenModal={handleOpenModal}
          onUpdateStatus={handleUpdateOrderStatus}
        />
        <OrderStatus
          title='완료' orders={doneOrders} onOpenModal={handleOpenModal} onUpdateStatus={handleUpdateOrderStatus}
        />
      </div>
      {selectedOrder && <OrderModal open={isModalOpen} onClose={handleCloseModal} order={selectedOrder} />}
    </>
  );
}
