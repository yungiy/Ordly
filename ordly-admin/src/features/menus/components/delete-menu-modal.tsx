'use client';

import Modal from '@/components/common/modal';
import Button from '@/components/common/button';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
};

export default function DeleteMenuModal({
  open,
  onClose,
  onConfirm,
  isDeleting,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className='min-w-sm flex justify-between items-center mb-4'>
        <h2 className='font-bold text-xl'>메뉴 삭제</h2>
        <Button onClick={onClose} className='w-10 h-10'>
          <X />
        </Button>
      </div>
      <p className='mb-6'>
        이 메뉴를 삭제하시겠습니까?
      </p>
      <div className='flex justify-end gap-2'>
        <Button
          onClick={onClose}
          disabled={isDeleting}
          className='bg-gray-200 py-2 px-4 text-gray-700 font-bold hover:bg-gray-300'
        >
          취소
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          className='bg-red-600 text-white py-2 px-4 font-bold'
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </Button>
      </div>
    </Modal>
  );
}
