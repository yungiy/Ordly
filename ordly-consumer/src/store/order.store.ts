import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './cart.store';

export type Order = {
  id: string;
  date: Date;
  items: CartItem[];
  totalPrice: number;
}

type OrderState = {
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
          orders: [newOrder, ...state.orders], 
        }));
      },
    }),
    {
      name: 'order-history-storage',
    },
  ),
);
