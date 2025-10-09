'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { useCartStore } from '@/store/cartStore';
import Header from '@/components/layout/header';
import { formatCurrency } from '@/utils/format';
import { useToastStore } from '@/store/toastStore';
import { useRouter } from 'next/navigation';

// 아임포트 타입 정의 (window.IMP)
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
  const { items, getCartTotalPrice } = useCartStore();
  const { showToast } = useToastStore();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  const totalPrice = getCartTotalPrice();
  const iamportKey = process.env.NEXT_PUBLIC_IAMPORT_KEY;

  const handlePayment = async () => {
    if (!paymentMethod) {
      showToast('결제 수단을 선택해주세요.');
      return;
    }
    if (!window.IMP || !iamportKey) {
      showToast('결제 모듈 로딩 중이거나, 키가 설정되지 않았습니다.');
      return;
    }

    setLoading(true);
    window.IMP.init(iamportKey);

    const merchant_uid = `order_${new Date().getTime()}`;
    const itemName = items.length > 1 ? `${items[0].title} 외 ${items.length - 1}건` : items[0].title;

    const paymentData = {
      pg: paymentMethod, // 카카오페이: 'kakaopay', 네이버페이: 'naverpay'
      pay_method: 'card', // 또는 'trans', 'phone' 등
      merchant_uid,
      name: itemName,
      amount: totalPrice,
      buyer_name: '테스트 구매자',
      buyer_tel: '010-1234-5678',
      buyer_email: 'test@example.com',
    };

    window.IMP.request_pay(paymentData, (rsp) => {
      if (rsp.success) {
        // TODO: 서버에 결제 검증 요청 (rsp.imp_uid, rsp.merchant_uid)
        console.log('결제 성공:', rsp);
        // 검증 성공 시 장바구니 비우고 완료 페이지로 이동
        // clearCart(); 
        router.push(`/pay/complete?merchant_uid=${rsp.merchant_uid}`);
      } else {
        console.error('결제 실패:', rsp);
        showToast(`결제에 실패했습니다: ${rsp.error_msg}`);
      }
      setLoading(false);
    });
  };

  return (
    <>
      <Script 
        src="https://cdn.iamport.kr/v1/iamport.js"
        strategy="afterInteractive"
      />
      <div className='flex flex-col h-full bg-gray-50'>
        <Header title='결제하기' showBackButton />
        <div className='p-4 space-y-6 flex-grow'>
          {/* 주문 요약 카드 */}
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h3 className='text-lg font-bold border-b pb-3 mb-3'>주문 요약</h3>
            <div className='space-y-2 text-gray-700'>
              {items.map(item => (
                <div key={item.id} className='flex justify-between'>
                  <span>{item.title} x{item.quantity}</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className='border-t mt-4 pt-4 flex justify-between text-xl font-bold'>
              <span>총 결제금액</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          {/* 결제 수단 선택 카드 */}
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h3 className='text-lg font-bold border-b pb-3 mb-3'>결제 수단</h3>
            <div className='grid grid-cols-2 gap-4'>
              <button 
                onClick={() => setPaymentMethod('kakaopay')}
                className={`p-4 border-2 rounded-lg text-center font-semibold ${paymentMethod === 'kakaopay' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
                카카오페이
              </button>
              <button 
                onClick={() => setPaymentMethod('naverpay')}
                className={`p-4 border-2 rounded-lg text-center font-semibold ${paymentMethod === 'naverpay' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                네이버페이
              </button>
            </div>
          </div>
        </div>

        {/* 하단 결제 버튼 */}
        <div className='p-4 bg-white border-t'>
          <button 
            onClick={handlePayment}
            disabled={loading || items.length === 0}
            className='w-full bg-black text-white text-lg font-bold py-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed'>
            {loading ? '결제 진행 중...' : `${formatCurrency(totalPrice)} 결제하기`}
          </button>
        </div>
      </div>
    </>
  );
}
