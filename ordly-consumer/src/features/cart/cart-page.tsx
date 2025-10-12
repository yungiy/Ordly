'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart.store';
import CartEmpty from './cart-empty';
import CartItemsList from './cart-item-list';
import CartSummary from './cart-summary';

export default function CartPage() {
  const router = useRouter();
  const { items, updateItemQuantity, removeFromCart, getCartTotalPrice } =
    useCartStore();

  const totalPrice = getCartTotalPrice();

  const handleCheckout = () => {
    if (items.length === 0) return;
    router.push('/pay');
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateItemQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className='flex flex-col h-full bg-gray-50 pb-48'>
      <CartItemsList
        items={items}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />
      <CartSummary // The component was already here, but now it's being "officially" added by the refactor.
        totalPrice={totalPrice}
        itemCount={items.length}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
