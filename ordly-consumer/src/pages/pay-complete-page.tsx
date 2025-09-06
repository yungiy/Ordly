'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import { useCartStore } from '@/store/cartStore';
import { CheckCircle2 } from 'lucide-react';

export default function PayCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();

  const merchantUid = searchParams?.get('merchant_uid');

  // 이 페이지에 진입하면 장바구니를 비웁니다.
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header title='결제 완료' />
      <div className='flex-grow flex flex-col items-center justify-center text-center p-4'>
        <CheckCircle2 className='h-16 w-16 text-green-500 mb-6' />
        <h2 className='text-2xl font-bold mb-2'>결제가 성공적으로 완료되었습니다.</h2>
        <p className='text-gray-600 mb-4'>주문해 주셔서 감사합니다.</p>
        {merchantUid && (
          <p className='text-sm text-gray-500'>주문번호: {merchantUid}</p>
        )}
        <button 
          onClick={() => router.push('/order-history')} 
          className='mt-8 px-8 py-3 bg-black text-white rounded-lg font-bold text-lg'
        >
          주문내역 확인하기
        </button>
      </div>
    </div>
  );
}
