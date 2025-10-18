'use client';

import { formatCurrency } from '@/utils/format';
import type {
  Order,
  OrderItem,
  MenuItem,
  OrderStatus,
} from '@/generated/prisma';

export type OrderWithItems = Order & {
  OrderItem: (OrderItem & {
    MenuItem: MenuItem;
  })[];
};

type Props = {
  orders: OrderWithItems[];
};

const statusMap: Record<OrderStatus, { text: string; className: string }> = {
  PENDING: { text: '결제대기', className: 'bg-yellow-100 text-yellow-800' },
  PREPARING: { text: '준비중', className: 'bg-blue-100 text-blue-800' },
  COMPLETED: { text: '주문완료', className: 'bg-green-100 text-green-800' },
  CANCELED: { text: '주문취소', className: 'bg-red-100 text-red-800' },
};

export default function OrderHistoryList({ orders }: Props) {
  return (
    <div className='p-4 space-y-4'>
      {orders.map((order) => (
        <div key={order.id} className='bg-white rounded-lg shadow-sm p-4'>
          <div className='flex justify-between items-center border-b pb-3 mb-3'>
            <div>
              <p className='text-sm text-gray-500'>
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className='text-xs text-gray-400'>{order.orderNumber}</p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                statusMap[order.status]?.className ||
                'bg-gray-100 text-gray-800'
              }`}
            >
              {statusMap[order.status]?.text || order.status}
            </span>
          </div>
          <div className='space-y-2'>
            {order.OrderItem.map((item) => (
              <div key={item.id} className='flex items-center space-x-3'>
                <div className='flex-grow'>
                  <p className='font-semibold'>{item.MenuItem.name}</p>
                  <p className='text-sm text-gray-500'>
                    {formatCurrency(Number(item.priceAtOrder))} x{' '}
                    {item.quantity}개
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='border-t mt-3 pt-3 flex justify-between font-bold'>
            <span>총 결제금액</span>
            <span>{formatCurrency(Number(order.totalPrice))}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
