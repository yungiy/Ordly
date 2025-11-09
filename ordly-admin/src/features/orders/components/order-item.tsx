'use client';
import Button from '@/components/common/button';
import { Order } from '@/types/types';
import { twMerge } from 'tailwind-merge';

type Props = {
  order: Order;
  onOpenModal: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
};

export default function OrderItem({
  order,
  onOpenModal,
  onUpdateStatus,
}: Props) {
  const statusStyles: Record<Order['status'], string> = {
    준비중: 'bg-blue-50 border-blue-200',
    조리중: 'bg-yellow-50 border-yellow-200',
    완료: 'bg-green-50 border-green-200',
    취소: 'bg-red-50 border-red-200',
  };

  const statusButtonStyles: Partial<Record<Order['status'], string>> = {
    준비중: 'bg-blue-400 text-white',
    조리중: 'bg-yellow-500 text-white',
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

  const getNextStatusText = (): string => {
    switch (order.status) {
      case '준비중':
        return '조리 시작';
      case '조리중':
        return '조리 완료';
      default:
        return '완료';
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
        'flex flex-col p-3 rounded-md',
        statusStyles[order.status]
      )}
    >
      <div className='flex justify-between items-start w-full'>
        <div>
          <p className='font-bold text-md text-gray-800'>
            #{order.orderNumber}
          </p>
          <p className='text-xs text-gray-600 mt-0.5'>
            {order.items[0]?.name ?? '주문 항목 없음'}
            {order.items.length > 1 && ` 외 ${order.items.length - 1}개`}
          </p>
        </div>
      </div>

      <div className='flex gap-1.5 mt-3 pt-2 border-t-2 border-gray-400 border-dashed'>
        <Button
          onClick={() => onOpenModal(order)}
          className='w-full bg-gray-800 text-white font-semibold py-1.5 rounded-md text-sm hover:bg-gray-700 transition-colors'
        >
          상세
        </Button>
        {order.status !== '완료' && order.status !== '취소' && (
          <Button
            onClick={handleStatusUpdate}
            className={twMerge(
              'w-full font-semibold py-1.5 rounded-md text-sm transition-colors disabled:bg-gray-400',
              statusButtonStyles[order.status]
            )}
          >
            {getNextStatusText()}
          </Button>
        )}
      </div>
    </div>
  );
}
