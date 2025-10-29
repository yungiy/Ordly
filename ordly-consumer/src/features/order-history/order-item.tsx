import React from 'react';
import type { CartItem } from '@/store/cart.store';
import { formatCurrency } from '@/utils/format';

const OrderItem = React.memo(({ item }: { item: CartItem }) => (
  <div className='flex justify-between'>
    <span>
      {item.title} x{item.quantity}
    </span>
    <span>{formatCurrency(item.price * item.quantity)}</span>
  </div>
));
OrderItem.displayName = 'OrderItem';

export default OrderItem;