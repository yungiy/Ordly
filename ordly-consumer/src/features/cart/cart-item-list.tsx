'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import type { CartItem as CartItemType } from '@/store/cart.store';
import CartItem from './cart-item';

type Props = {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function CartItemsList({ items, onUpdateQuantity, onRemove }: Props) {
  const router = useRouter();
  return (
    <div className='p-4'>
      <div className='bg-white rounded-lg shadow-sm p-4 space-y-4'>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
        <button
          onClick={() => router.push('/')}
          className='flex items-center justify-center w-full gap-1 py-3 border-2 border-dashed rounded-lg text-gray-700 font-semibold mt-4'
        >
          <Plus size={18} />
          메뉴추가
        </button>
      </div>
    </div>
  );
}

export default CartItemsList;
