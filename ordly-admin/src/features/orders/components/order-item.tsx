import Button from '@/components/common/button';
import { Order } from '@/types/types';

type Props = {
  order: Order;
};

export default function OrderItem({ order }: Props) {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <p className='font-bold text-lg text-gray-800'>
           {order.items[0].name}
        </p>
        <p className='text-sm text-gray-500'>주문번호: {order.orderNumber}</p>
      </div>

      <div className='flex gap-2'>
        <Button className='px-2 border rounded-full text-gray-800 hover:bg-gray-300'>
          완료
        </Button>
        <Button className='px-2 border rounded-full text-gray-800 hover:bg-gray-300'>
          상세
        </Button>
      </div>
    </div>
  );
}
