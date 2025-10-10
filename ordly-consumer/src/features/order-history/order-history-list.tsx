'use client';

import type { Order } from '@/store/order.store';
import OrderItemCard from '../order/order-item-card';

type Props = {
  orders: Order[];
}

export default function OrderHistoryList({ orders }: Props) {
  return (
    <div className='p-4 space-y-4'>
      {orders.map((order) => (
        <OrderItemCard key={order.id} order={order} />
      ))}
    </div>
  );
}

