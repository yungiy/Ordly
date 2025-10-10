'use client';

import FixedActionBar from '@/components/common/fixed-action-bar';
import AnimatedPrice from '@/components/common/animated-price';
import { formatCurrency } from '@/utils/format';

type Props = {
  totalPrice: number;
  itemCount: number;
  onCheckout: () => void;
}

function CartSummary({ totalPrice, itemCount, onCheckout }: Props) {
  return (
    <FixedActionBar>
      <div className='p-4 border-t border-gray-200'>
        <div className='flex justify-between items-center text-xl font-bold mb-4'>
          <span>결제금액</span>
          <AnimatedPrice amount={totalPrice} />
        </div>
        <button
          onClick={onCheckout}
          disabled={itemCount === 0}
          className='w-full bg-black text-white text-lg font-bold py-4 rounded-lg flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          <span>{formatCurrency(totalPrice)}</span>
          <span className='opacity-50'>|</span>
          <span>결제하기</span>
        </button>
      </div>
    </FixedActionBar>
  );
}

export default CartSummary;
