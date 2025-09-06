import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './cartStore';

export interface Order {
  id: string;
  date: Date;
  items: CartItem[];
  totalPrice: number;
}

interface OrderState {
  orders: Order[];
  addOrder: (items: CartItem[], totalPrice: number) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (items, totalPrice) => {
        const newOrder: Order = {
          id: `order_${Date.now()}`,
          date: new Date(),
          items,
          totalPrice,
        };
        set((state) => ({
          orders: [newOrder, ...state.orders], // 최신 주문이 위로 오도록 추가
        }));
      },
    }),
    {
      name: 'order-history-storage', // 로컬 스토리지에 저장될 이름
    },
  ),
);
