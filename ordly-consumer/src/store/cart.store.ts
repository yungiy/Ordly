import { create } from 'zustand';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getCartTotalQuantity: () => number;
  getCartTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item, quantity) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
        return { items: updatedItems };
      } else {
        return { items: [...state.items, { ...item, quantity }] };
      }
    });
  },
  updateItemQuantity: (itemId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0), // 수량이 0 이하면 자동 삭제
    }));
  },
  removeFromCart: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  clearCart: () => {
    set({ items: [] });
  },
  getCartTotalQuantity: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  getCartTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
