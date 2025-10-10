'use client';

import React from 'react';
import { useOrderStore } from '@/store/order.store';
import Header from '@/components/layout/header';
import OrderHistoryEmpty from './order-history-empty';
import OrderHistoryList from './order-history-list';

export default function OrderHistoryPage() {
  const { orders } = useOrderStore();

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header title='주문내역' showBackButton />

      {orders.length === 0 ? (
        <OrderHistoryEmpty />
      ) : (
        <OrderHistoryList orders={orders} />
      )}
    </div>
  );
}
