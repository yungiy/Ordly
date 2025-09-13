import { Order } from '@/types/types';
import OrderStatus from './order-status';

const sampleOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'A-101',
    status: 'pending',
    items: [{ name: '후라이드 치킨' }],
  },
  {
    id: 2,
    orderNumber: 'A-102',
    status: 'pending',
    items: [{ name: '양념 치킨' }],
  },
  { id: 3, orderNumber: 'A-103', status: 'cooking', items: [{ name: '피자' }] },
  { id: 4, orderNumber: 'A-104', status: 'done', items: [{ name: '파스타' }] },
];

export default function OrderPage() {
  const pendingOrders = sampleOrders.filter((o) => o.status === 'pending');
  const cookingOrders = sampleOrders.filter((o) => o.status === 'cooking');
  const doneOrders = sampleOrders.filter((o) => o.status === 'done');

  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 sm:p-2 lg:p-4 flex-grow'>
      <OrderStatus title='주문완료' orders={pendingOrders} />
      <OrderStatus title='조리중' orders={cookingOrders} />
      <OrderStatus title='완료' orders={doneOrders} />
    </div>
  );
}
