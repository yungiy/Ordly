'use client';

import React, { useMemo } from 'react';
import Script from 'next/script';
import { useCartStore } from '@/store/cart.store';
import Header from '@/components/layout/header';
import { formatCurrency } from '@/utils/format';
import { useToastStore } from '@/store/toast.store';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import type { CartItem } from '@/store/cart.store';
import { createOrder, verifyPayment } from './pay.api';
import Button from '@/components/common/button';

interface Iamport {
  init: (key: string) => void;
  request_pay: (params: any, callback: (rsp: any) => void) => void;
}
declare global {
  interface Window {
    IMP?: Iamport;
  }
}

const OrderItem = React.memo(({ item }: { item: CartItem }) => (
  <div className='flex justify-between'>
    <span>
      {item.title} x{item.quantity}
    </span>
    <span>{formatCurrency(item.price * item.quantity)}</span>
  </div>
));
OrderItem.displayName = 'OrderItem';

export default function PayPage() {
  const { items, getCartTotalPrice, clearCart } = useCartStore();
  const { showToast } = useToastStore();
  const router = useRouter();
  const paymentMethod = 'card';
  const totalPrice = getCartTotalPrice();
  const iamportKey = process.env.NEXT_PUBLIC_IAMPORT_KEY;

  const verifyPaymentMutation = useMutation({
    mutationFn: verifyPayment,
    onSuccess: (data, variables) => {
      if (data.status === 'success') {
        clearCart();
        router.push(
          `/pay/complete?merchant_uid=${variables.merchant_uid}&imp_uid=${variables.imp_uid}`
        );
      } else {
        showToast('결제 검증에 실패했습니다.');
      }
    },
    onError: () => {
      showToast('결제 검증 중 오류가 발생했습니다.');
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (orderData) => {
      if (!window.IMP || !iamportKey) {
        return console.log('아임포트키가 설정되지 않았습니다')
      }

      const { merchant_uid, amount } = orderData;
      const itemName =
        items.length > 1
          ? `${items[0].title} 외 ${items.length - 1}건`
          : items[0].title;

      window.IMP.init(iamportKey);
      const paymentData = {
        pg: 'nice',
        pay_method: paymentMethod,
        merchant_uid,
        name: itemName,
        amount,
        buyer_name: '테스트 구매자', // 실제 사용자 정보로 대체 필요
        buyer_tel: '010-1234-5678',
        buyer_email: 'test@example.com',
      };

      window.IMP.request_pay(paymentData, (rsp) => {
        if (rsp.success) {
          verifyPaymentMutation.mutate({
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
          });
        } else {
          showToast('결제에 실패했습니다');
        }
      });
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  const handlePayment = () => {
    const orderPayload = {
      items: items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        priceAtOrder: item.price,
      })),
      storeId: 'cmghk30ry000j85u5adupj84d',
    };
    createOrderMutation.mutate(orderPayload);
  };

  const isProcessing =
    createOrderMutation.isPending || verifyPaymentMutation.isPending;

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

      {isProcessing && (
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 bg-white'>
          <div className='w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500' />
        </div>
      )}

      <div className='flex flex-col h-full bg-gray-50'>
        <Header title='결제하기' showBackButton />

        <div className='p-4 space-y-6 flex-grow'>
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h3 className='text-lg font-bold border-b pb-3 mb-3'>주문 요약</h3>
            <div className='space-y-2 text-gray-700'>
              {orderSummary}
            </div>
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
            onClick={handlePayment}
            disabled={isProcessing || items.length === 0}
            className='w-full bg-black text-white text-lg font-bold py-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {isProcessing
              ? '처리 중...'
              : `${formatCurrency(totalPrice)} 결제하기`}
          </Button>
        </div>
      </div>
    </>
  );
}
