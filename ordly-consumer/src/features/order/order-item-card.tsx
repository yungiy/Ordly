'use client';

import type { Order } from '@/store/order.store';
import { formatCurrency } from '@/utils/format';

type Props = {
  order: Order;
}

function OrderItemCard({ order }: Props) {
  return (
    <div className='bg-white rounded-lg shadow-sm p-4'>
      <div className='border-b pb-2 mb-2 flex justify-between items-center'>
        <h3 className='font-bold text-lg'>
          {new Date(order.date).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </h3>
        <span className='font-bold text-lg'>
          {formatCurrency(order.totalPrice)}
        </span>
      </div>
      <div className='space-y-2'>
        {order.items.map((item) => (
          <div key={item.id} className='flex justify-between text-gray-600'>
            <span>{item.title} x {item.quantity}</span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderItemCard;