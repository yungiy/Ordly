'use client';

import { useEffect } from 'react';
import Portal from './portal';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  duration?: number;
};

export default function Toast({
  open,
  onClose,
  children,
  duration = 2000,
}: Props) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, duration, onClose]);

  if (!open) {
    return null;
  }

  return (
    <Portal containerId='toast-root'>
      <div className='fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-gray-800 text-white rounded-full shadow-md'>
        {children}
      </div>
    </Portal>
  );
}
