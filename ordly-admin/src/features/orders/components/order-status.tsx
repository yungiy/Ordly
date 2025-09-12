import CardItem from '@/components/common/card-item';
import OrderItem from './order-item';
import { Order } from '@/types/types';

type Props = {
  orders: Order[];
  title: string;
};

export default function OrderStatus({ title, orders }: Props) {
  return (
    <div className='flex flex-col'>
      <CardItem>
        <h2 className='text-xl text-black font-bold'>{title}</h2>
        <div className='flex flex-col gap-3 space-y-auto'>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </CardItem>
    </div>
  );
}
