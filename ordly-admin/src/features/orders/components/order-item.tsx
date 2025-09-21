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
           {order.items[0]?.name ?? '항목 없음'}
        </p>
        <p className='text-sm text-gray-500'>주문번호: {order.orderNumber}</p>
      </div>

      <div className='flex gap-2'>
        <Button className='px-2 text-sm border rounded-xl text-gray-800'>
          상세
        </Button>
        <Button className='px-2 border text-sm rounded-xl text-gray-800'>
          완료
        </Button>
      </div>
    </div>
  );
}
