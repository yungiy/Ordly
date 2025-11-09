import CardItem from '@/components/common/card-item';
import OrderItem from './order-item';
import { Order } from '@/types/types';

type Props = {
  orders: Order[];
  title: string;
  onOpenModal: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
};

export default function OrderStatus({
  title,
  orders,
  onOpenModal,
  onUpdateStatus,
}: Props) {
  return (
    <CardItem title={title}>
      <ul className='flex flex-col gap-2 overflow-auto'>
        {orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            onOpenModal={onOpenModal}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </ul>
    </CardItem>
  );
}
