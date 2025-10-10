'use client';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import Button from '@/components/common/button';
import { useCartStore } from '@/store/cart.store';
import AnimatedCounter from '../common/animated-counter';

export default function BottomBar() {
  const router = useRouter();
  const totalQuantity = useCartStore((state) => state.getCartTotalQuantity());

  const isDisabled = totalQuantity === 0;

  return (
    <div className='fixed bottom-0 left-1/2 w-full min-w-[360px] max-w-[430px] transform -translate-x-1/2 p-4 pt-4 z-50 bg-white'>
      <Button
        onClick={() => router.push('/cart')}
        className={`flex h-14 w-full items-center justify-between rounded-lg px-4 text-white  ${
          isDisabled
            ? 'bg-gray-300 cursor-not-allowed text-gray-700'
            : 'bg-black'
        }`}
        disabled={isDisabled}
      >
        <div className='flex items-center gap-2'>
          <ShoppingCart className='h-6 w-6' />
          <span className='text-lg font-bold'>장바구니</span>
        </div>
        <span
          className={`min-w-[2.5rem] rounded-full px-3 py-1 text-lg font-bold ${
            isDisabled ? 'bg-gray-400 text-white' : 'bg-white text-black'
          }`}
        >
          <AnimatedCounter value={totalQuantity} />
        </span>
      </Button>
    </div>
  );
}
