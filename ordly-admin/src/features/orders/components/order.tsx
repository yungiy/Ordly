'use client';

import { useState } from 'react';
import { Order } from '@/types/types';
import OrderStatus from './order-status';
import OrderModal from './order-modal';
import { useGetOrders, useUpdateOrderStatus } from '@/hooks/useOrders.hooks';

export default function OrderPage() {
  const { data: orders = [], isLoading, isError } = useGetOrders();
  const { mutate: updateStatus } = useUpdateOrderStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleUpdateOrderStatus = async (
    orderId: string,
    status: Order['status']
  ) => {
    try {
      updateStatus({ id: orderId, status });
    } catch (error) {
      console.error('주문 상태 업데이트에 실패했습니다:', error);
    }
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center h-full text-red-500'>
        주문 목록을 불러오는 데 실패했습니다.
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === '준비중');
  const cookingOrders = orders.filter((o) => o.status === '조리중');
  const doneOrders = orders.filter(
    (o) => o.status === '완료' || o.status === '취소'
  );

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
          title='완료'
          orders={doneOrders}
          onOpenModal={handleOpenModal}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      </div>
      {selectedOrder && (
        <OrderModal
          open={isModalOpen}
          onClose={handleCloseModal}
          order={selectedOrder}
        />
      )}
    </>
  );
}
