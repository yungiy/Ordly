import { create } from 'zustand';

interface Toast {
  id: number;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  showToast: (message: string) => void;
  hideToast: (id: number) => void;
}

let toastId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message) => {
    const id = toastId++;
    set((state) => ({ toasts: [...state.toasts, { id, message }] }));

    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
    }, 1500); // 1.5초 후에 토스트 자동 제거
  },
  hideToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
  },
}));
