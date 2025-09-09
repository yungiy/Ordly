'use client';

import { useEffect } from 'react';
import Portal from './portal';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z- flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="relative z-10 rounded-lg bg-white p-6 shadow-lg">
          {children}
        </div>
      </div>
    </Portal>
  );
}
