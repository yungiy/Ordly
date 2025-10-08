'use client';

import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../api/orders.api';
import { Order } from '@/types/types';
import OrderStatus from './order-status';
import OrderModal from './order-modal';

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('주문 목록을 불러오는 데 실패했습니다:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const updatedOrder = await updateOrderStatus({ id: orderId, status });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: updatedOrder.status } : order))
      );
    } catch (error) {
      console.error('주문 상태 업데이트에 실패했습니다:', error);
    }
  };

  const pendingOrders = orders.filter((o) => o.status === '준비중');
  const cookingOrders = orders.filter((o) => o.status === '조리중');
  const doneOrders = orders.filter((o) => o.status === '완료' || o.status === '취소');

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
