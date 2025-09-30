import OrderStatus from '@/features/orders/components/order-status';
import { Order } from '@/types/types';
import ReservationList from '@/features/reservations/components/reservation-list';
import HourlySalesChart from '../statistics/components/statistic-item';

const sampleInProgressOrders: Order[] = [
  { 
    id: 1, 
    tableNumber: 3,
    orderNumber: 101,
    status: 'cooking',
    items: [{id: 1, name: '아메리카노', quantity: 2, price: '4000'}], 
    totalPrice: '8000', 
    createdAt: '2025-09-13 18:50:15'
  },
  { 
    id: 2, 
    tableNumber: 5,
    orderNumber: 102,
    status: 'cooking',
    items: [
      {id: 2, name: '치즈케이크', quantity: 1, price: '4000'}, 
      {id: 3, name: '카페라떼', quantity: 1, price: '4000'}
    ], 
    totalPrice: '11000', 
    createdAt: '2025-09-13 18:55:45' 
  },
];


const sampleCompletedOrders: Order[] = [
  { 
    id: 4, 
    tableNumber: 1,
    orderNumber: 98,
    status: 'done',
    items: [{id: 4, name: '감바스', quantity: 1, price: '4000'}], 
    totalPrice: '12000', 
    createdAt: '2025-09-13 18:25:00' 
  },
];

export default function Dashboard() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_1fr] h-full gap-4 p-4 sm:p-2 lg:p-4'>
      <div className='md:col-span-1 flex-grow'>
        <OrderStatus title={`진행중인 주문 (${sampleInProgressOrders.length})`} orders={sampleInProgressOrders} />
      </div>

      <div className='md:col-span-1'>
        <OrderStatus title={`완료된 주문 (${sampleCompletedOrders.length})`} orders={sampleCompletedOrders} />
      </div>

      <div className='md:col-span-1 md:row-span-2'>
        <ReservationList />
      </div>

      <div className='md:col-span-2'>
        <HourlySalesChart />
      </div>
    </div>
  );
}