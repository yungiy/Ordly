import Button from '@/components/common/button';
import Modal from '@/components/common/modal';
import { Order } from '@/types/types';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  order: Order;
};

export default function OrderModal({ open, onClose, order }: Props) {
  const formattedDate = new Date(order.createdAt).toLocaleString('ko-KR');

  return (
    <Modal open={open} onClose={onClose}>
      <div className='w-full flex justify-between items-center mb-4'>
        <h2 className='font-bold text-xl'>주문 상세 정보</h2>
        <Button onClick={onClose} className='w-10 h-10'>
          <X />
        </Button>
      </div>
      <div className='space-y-6 text-gray-800'>
        <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm'>
          <p>
            <span className='font-semibold'>주문 번호:</span>
            {order.orderNumber}
          </p>
          <p>
            <span className='font-semibold'>주문 상태:</span> {order.status}
          </p>
          <p>
            <span className='font-semibold'>주문 시간:</span> {formattedDate}
          </p>
        </div>

        <div>
          <h3 className='font-bold text-lg mb-2 border-b pb-1'>주문 항목</h3>
          <ul className='space-y-2'>
            {order.items.map((item) => (
              <li
                key={item.id}
                className='flex justify-between items-center text-sm'
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{item.price}원</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='text-right font-bold text-lg border-t pt-2'>
          총 주문 금액: {order.totalPrice}원
        </div>
      </div>
    </Modal>
  );
}
