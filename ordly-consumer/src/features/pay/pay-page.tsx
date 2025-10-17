'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { useCartStore } from '@/store/cart.store';
import Header from '@/components/layout/header';
import { formatCurrency } from '@/utils/format';
import { useToastStore } from '@/store/toast.store';
import { useRouter } from 'next/navigation';

interface Iamport {
  init: (key: string) => void;
  request_pay: (params: any, callback: (rsp: any) => void) => void;
}
declare global {
  interface Window {
    IMP?: Iamport;
  }
}

export default function PayPage() {
  const { items, getCartTotalPrice, clearCart } = useCartStore();
  const { showToast } = useToastStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const paymentMethod = 'card';
  const totalPrice = getCartTotalPrice();
  const iamportKey = process.env.NEXT_PUBLIC_IAMPORT_KEY;

  const handlePayment = async () => {
    if (!window.IMP || !iamportKey) {
      showToast('결제 모듈 로딩 중이거나, 키가 설정되지 않았습니다.');
      return;
    }
    setLoading(true);
    const merchant_uid = `ord_${new Date().getTime()}`;
    const itemName =
      items.length > 1
        ? `${items[0].title} 외 ${items.length - 1}건`
        : items[0].title;

    window.IMP.init(iamportKey);

    window.IMP.request_pay(
      {
        pg: 'nice',
        pay_method: paymentMethod,
        merchant_uid,
        name: itemName,
        amount: totalPrice, // 장바구니 총액 사용
        buyer_name: '테스트 구매자',
        buyer_tel: '010-1234-5678',
        buyer_email: 'test@example.com',
      },
      (rsp) => {
        if (rsp.success) {
          fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 'success') {
                clearCart();
                router.push(
                  `/pay/complete?merchant_uid=${rsp.merchant_uid}&imp_uid=${rsp.imp_uid}`
                );
              } else {
                showToast(`결제 검증에 실패했습니다: ${data.message}`);
              }
            })
            .catch(() => {
              showToast('결제 검증 중 오류가 발생했습니다.');
            })
            .finally(() => setLoading(false));
        } else {
          showToast(
            `결제에 실패했습니다: ${rsp.error_msg || '알 수 없는 오류'}`
          );
          setLoading(false);
        }
      }
    );
  };
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
            <div className='space-y-2 text-gray-700'>
              {items.map((item) => (
                <div key={item.id} className='flex justify-between'>
                  <span>
                    {item.title} x{item.quantity}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className='border-t mt-4 pt-4 flex justify-between text-xl font-bold'>
              <span>총 결제금액</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h3 className='text-lg font-bold border-b pb-3 mb-3'>결제 수단</h3>
            <p className='text-gray-700'>신용카드</p>
          </div>
        </div>

        <div className='p-4 bg-white border-t'>
          <button
            onClick={handlePayment}
            disabled={loading || items.length === 0}
            className='w-full bg-black text-white text-lg font-bold py-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {loading
              ? '결제 진행 중...'
              : `${formatCurrency(totalPrice)} 결제하기`}
          </button>
        </div>
      </div>
    </>
  );
}
