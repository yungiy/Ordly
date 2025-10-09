'use client';
import Button from '@/components/common/button';
import { Order } from '@/types/types';
import { twMerge } from 'tailwind-merge';

type Props = {
  order: Order;
  onOpenModal: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
};

export default function OrderItem({ order, onOpenModal, onUpdateStatus }: Props) {
  const statusBgColor: Record<Order['status'], string> = {
    준비중: 'bg-blue-50',
    조리중: 'bg-yellow-50',
    완료: 'bg-green-50',
    취소: 'bg-red-50',
  };

  const getNextStatus = (): Order['status'] | null => {
    switch (order.status) {
      case '준비중':
        return '조리중';
      case '조리중':
        return '완료';
      default:
        return null;
    }
  };

  const handleStatusUpdate = () => {
    const nextStatus = getNextStatus();
    if (nextStatus) {
      onUpdateStatus(order.id, nextStatus);
    }
  };
  return (
    <div
      className={twMerge(
        'flex justify-between items-center p-3 rounded-lg',
        statusBgColor[order.status]
      )}
    >
      <div>
        <p className='font-bold text-lg text-gray-800'>
           {order.items[0]?.name ?? '항목 없음'}
        </p>
        <p className='text-sm text-gray-500'>주문번호: {order.orderNumber}</p>
      </div>

      <div className='flex gap-2'>
        <Button
          onClick={() => onOpenModal(order)}
          className='px-2 text-sm border rounded-xl text-gray-800'
        >
          상세
        </Button>
        {order.status !== '완료' && order.status !== '취소' && (
          <Button
            onClick={handleStatusUpdate}
            className='px-2 border text-sm rounded-xl text-gray-800'
          >
            완료
          </Button>
        )}
      </div>
    </div>
  );
}
