'use client';

import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';
import { useToastStore } from '@/store/toastStore';
import QuantitySelector from '@/components/common/quantity-selector';
import FixedActionBar from '@/components/common/fixed-action-bar';
import AnimatedPrice from '@/components/common/animated-price';
import { formatCurrency } from '@/utils/format';
import { X, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    updateItemQuantity,
    removeFromCart,
    getCartTotalPrice,
    getCartTotalQuantity,
    clearCart,
  } = useCartStore();
  const { addOrder } = useOrderStore();
  const { showToast } = useToastStore();

  const totalPrice = getCartTotalPrice();

  const handleCheckout = () => {
    if (items.length === 0) return;
    router.push('/pay');
  };

  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-full text-center bg-gray-50'>
        <p className='text-xl font-semibold'>장바구니가 비어있습니다.</p>
        <button 
          onClick={() => router.push('/')} 
          className='mt-4 px-6 py-2 bg-black text-white rounded-lg font-bold'
        >
          메뉴 보러가기
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full bg-gray-50 pb-48'>
      <div className='p-4'>
        <div className='bg-white rounded-lg shadow-sm p-4 space-y-4'>
          {items.map((item) => (
            <div key={item.id} className='border-b pb-4 last:border-b-0'>
              <div className='flex justify-between items-start mb-2'>
                <h3 className='font-bold text-lg'>{item.title}</h3>
                <button onClick={() => removeFromCart(item.id)} className='text-gray-400 hover:text-black'>
                  <X size={20} />
                </button>
              </div>
              <div className='flex justify-between items-center'>
                <QuantitySelector 
                  value={item.quantity} 
                  onChange={(newQuantity) => updateItemQuantity(item.id, newQuantity)}
                />
                <span className='font-bold text-lg'>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            </div>
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

      <FixedActionBar>
        <div className='p-4 border-t border-gray-200'>
          <div className='flex justify-between items-center text-xl font-bold mb-4'>
            <span>결제금액</span>
            <AnimatedPrice amount={totalPrice} />
          </div>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className='w-full bg-black text-white text-lg font-bold py-4 rounded-lg flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            <span>{formatCurrency(totalPrice)}</span>
            <span className='opacity-50'>|</span>
            <span>결제하기</span>
          </button>
        </div>
      </FixedActionBar>
    </div>
  );
}
