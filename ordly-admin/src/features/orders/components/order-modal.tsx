import Button from '@/components/common/button';
import Modal from '@/components/common/modal';
import { Order } from '@/types/types';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  open: boolean;
  onClose: () => void;
  order: Order;
};

export default function OrderModal({ open, onClose, order }: Props) {
  const formattedDate = new Date(order.createdAt).toLocaleString('ko-KR');

  const statusBadge: Record<Order['status'], string> = {
    준비중: 'bg-blue-100 text-blue-800',
    조리중: 'bg-yellow-100 text-yellow-800',
    완료: 'bg-green-100 text-green-800',
    취소: 'bg-red-100 text-red-800',
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className='min-w-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='font-bold text-xl'>주문 상세 정보</h2>
          <Button onClick={onClose} className='w-auto'>
            <X size={30} />
          </Button>
        </div>

        <div className='space-y-3'>
          <div className='border-b-2 border-dashed border-gray-500 space-y-2 pb-4'>
            <div className='flex items-center gap-2'>
              <span className='font-bold'>주문 번호: </span>
              <span>{order.orderNumber}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-bold'>주문 상태: </span>
              <span
                className={twMerge(
                  'px-2.5 py-0.5 rounded-full text-sm font-semibold',
                  statusBadge[order.status]
                )}
              >
                {order.status}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-bold'>주문 시간: </span>
              <span>{formattedDate}</span>
            </div>
          </div>

          <div>
            <h3 className='font-bold text-lg mb-2'>주문 항목</h3>
            <ul className='space-y-2'>
              {order.items.map((item) => (
                <li key={item.id} className='flex justify-between items-center'>
                  <div>
                    <p className='font-semibold'>{item.name}</p>
                    <p className='text-gray-600'>
                      {item.quantity}개 x {item.price.toLocaleString()}원
                    </p>
                  </div>
                  <span className='font-bold'>
                    {(item.quantity * Number(item.price)).toLocaleString()}원
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className='text-right font-bold text-xl border-t-2 border-dashed border-gray-500 pt-4'>
            <span>총 주문 금액: {order.totalPrice.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
