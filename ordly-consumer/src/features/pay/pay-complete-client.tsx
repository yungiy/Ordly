'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import { CheckCircle2 } from 'lucide-react';
import { useToastStore } from '@/store/toast.store';
import { cancelPayment } from './pay.api';
import Button from '@/components/common/button';

export default function PayCompleteClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToastStore();
  const [isCanceling, setIsCanceling] = useState(false);

  const merchantUid = searchParams?.get('merchant_uid');
  const impUid = searchParams?.get('imp_uid');

  useEffect(() => {
    if (merchantUid) {
      const existingOrders = JSON.parse(
        localStorage.getItem('my_orders') || '[]'
      );

      if (!existingOrders.includes(merchantUid)) {
        const updatedOrders = [...existingOrders, merchantUid];
        localStorage.setItem('my_orders', JSON.stringify(updatedOrders));
      }
    }
  }, [merchantUid]);

  const handleCancel = async () => {
    if (!impUid) return;
    setIsCanceling(true);
    try {
      const result = await cancelPayment({
        imp_uid: impUid,
        reason: '사용자 변심',
      });
      if (result.code === 0) {
        showToast('결제가 성공적으로 취소되었습니다');
        router.push('/order-history');
      } else {
        showToast('결제 취소에 실패했습니다');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '결제 취소 중 오류가 발생했습니다.';
      showToast(errorMessage);
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header title='결제 완료' />
      <div className='flex-grow flex flex-col items-center justify-center text-center p-4'>
        <CheckCircle2 className='h-16 w-16 text-green-500 mb-6' />
        <h2 className='text-2xl font-bold mb-2'>
          결제가 성공적으로 완료되었습니다.
        </h2>
        <p className='text-gray-600 mb-4'>주문해 주셔서 감사합니다.</p>
        {merchantUid && (
          <p className='text-sm text-gray-500'>주문번호: {merchantUid}</p>
        )}
        <button
          onClick={handleCancel}
          disabled={isCanceling}
          className='mt-4 text-gray-500 underline disabled:text-gray-400'
        >
          {isCanceling ? '취소 처리 중...' : '결제 취소하기'}
        </button>
        <button
          onClick={() => router.push('/order-history')}
          className='mt-8 px-8 py-4 bg-black text-white rounded-lg font-bold text-lg'
        >
          주문내역 확인하기
        </button>
      </div>
    </div>
  );
}
