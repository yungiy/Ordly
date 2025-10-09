'use client';

import Modal from '@/components/common/modal';
import Button from '@/components/common/button';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteCouponModal({ open, onClose, onConfirm }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='w-full flex justify-between items-center mb-4'>
        <h2 className='font-bold text-xl'>쿠폰 삭제</h2>
        <Button onClick={onClose} className='w-auto h-auto'>
          <X size={30} />
        </Button>
      </div>
      <p className='mb-6'>정말로 이 쿠폰을 삭제하시겠습니까?</p>
      <div className='flex justify-end gap-2'>
        <Button
          onClick={onClose}
          className='bg-gray-200 p-2 text-gray-700 font-bold hover:bg-gray-300'
        >
          취소
        </Button>
        <Button
          onClick={onConfirm}
          className='bg-red-500 text-white p-2 font-bold'
        >
          삭제
        </Button>
      </div>
    </Modal>
  );
}
