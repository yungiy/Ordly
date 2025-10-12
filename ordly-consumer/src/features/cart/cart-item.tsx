'use client';

import QuantitySelector from '@/components/common/quantity-selector';
import { formatCurrency } from '@/utils/format';
import { X } from 'lucide-react';
import type { CartItem as CartItemType } from '@/store/cart.store';

type CartItemProps = {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className='border-b pb-4 last:border-b-0'>
      <div className='flex justify-between items-start mb-2'>
        <h3 className='font-bold text-lg'>{item.title}</h3>
        <button
          onClick={() => onRemove(item.id)}
          className='text-gray-400 hover:text-black'
        >
          <X size={20} />
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <QuantitySelector
          value={item.quantity}
          onChange={(newQuantity) => onUpdateQuantity(item.id, newQuantity)}
        />
        <span className='font-bold text-lg'>
          {formatCurrency(item.price * item.quantity)}
        </span>
      </div>
    </div>
  );
}

export default CartItem;