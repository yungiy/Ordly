'use client';

import React, { useMemo } from 'react';
import Script from 'next/script';
import { useCartStore } from '@/store/cart.store';
import Header from '@/components/layout/header';
import { formatCurrency } from '@/utils/format';
import Button from '@/components/common/button';
import { usePayment } from '../../hooks/usePayment.hooks';
import type { Iamport } from '@/types/iamport';
import OrderItem from '../order-history/order-item';

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

export default function PayPage() {
  const { items, getCartTotalPrice } = useCartStore();
  const { startPayment, isProcessing } = usePayment();
  const totalPrice = getCartTotalPrice();

  const orderSummary = useMemo(
    () => items.map((item) => <OrderItem key={item.id} item={item} />),
    [items]
  );
  return (
    <>
      <Script
        src='https://cdn.iamport.kr/v1/iamport.js'
        strategy='afterInteractive'
      />

      <div className='flex flex-col h-full bg-gray-50'>
        <Header title='결제하기' showBackButton />

        <div className='p-4 space-y-6 flex-grow'>
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h3 className='text-lg font-bold border-b pb-3 mb-3'>주문 요약</h3>
            <div className='space-y-2 text-gray-700'>{orderSummary}</div>
            <div className='border-t mt-4 pt-4 flex justify-between text-xl font-bold'>
              <span>총 결제금액</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h3 className='text-lg font-bold border-b pb-3 mb-3'>결제 수단</h3>
            <div className='text-gray-700 flex flex-col items-center justify-center py-6'>
              <span>신용카드로 결제 가능합니다.</span>
              <span>결제하기를 눌러주세요.</span>
            </div>
          </div>
        </div>

        <div className='p-4 bg-white border-t border-gray-200'>
          <Button
            onClick={startPayment}
            disabled={isProcessing || items.length === 0}
            className='w-full bg-black text-white text-lg font-bold py-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed'
          >
            {isProcessing ? (
              <span>처리 중...</span>
            ) : (
              `${formatCurrency(totalPrice)} 결제하기`
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
