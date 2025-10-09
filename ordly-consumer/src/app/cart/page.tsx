'use client';
import Header from '@/components/layout/header';
import CartPage from '@/features/cart/cart-page';
import { useCartStore } from '@/store/cartStore';

export default function Cart() {
  const { clearCart } = useCartStore();

  return (
    <div className="flex flex-col h-screen">
      <Header 
        title="장바구니" 
        showBackButton 
        rightContent={
          <button onClick={clearCart} className='text-sm text-gray-600 font-semibold'>
            전체삭제
          </button>
        }
      />
      <main className="flex-grow overflow-y-auto bg-gray-50">
        <CartPage />
      </main>
    </div>
  );
}
