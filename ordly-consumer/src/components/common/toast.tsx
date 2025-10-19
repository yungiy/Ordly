'use client';

import { useToastStore } from '@/store/toast.store';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import Button from './button';

type Props = {
  message: string;
  id: number;
  className?: string;
}

function Toast({ message, id, className }: Props) {
  const { hideToast } = useToastStore();

  return (
    <div
      className={twMerge(
        'flex items-center justify-between h-14 p-4 text-black bg-yellow-400 rounded-lg shadow-lg w-full',
        className,
      )}
      role='alert'
    >
      <div className='text-sm font-semibold'>{message}</div>
      <Button
        type='button'
        className='-mx-1.5 -my-1.5 bg-yellow-400 text-black hover:text-black rounded-lg inline-flex items-center justify-center h-6 w-6'
        onClick={() => hideToast(id)}
        aria-label='Close'
      >
        <span className='sr-only'>Close</span>
        <X className='w-4 h-4' />
      </Button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div className='max-w-[430px] w-full fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 px-4'>
      {toasts.map((toast: any) => (
        <Toast key={toast.id} id={toast.id} message={toast.message} />
      ))}
    </div>
  );
}
