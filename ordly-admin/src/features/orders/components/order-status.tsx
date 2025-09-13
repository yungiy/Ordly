import CardItem from '@/components/common/card-item';
import OrderItem from './order-item';
import { Order } from '@/types/types';

type Props = {
  orders: Order[];
  title: string;
};

export default function OrderStatus({ title, orders }: Props) {
  return (
    <CardItem title={title}>
      <ul className='flex flex-col gap-3'>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </CardItem>
  );
}
