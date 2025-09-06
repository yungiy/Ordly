'use client';

import React from 'react';
import { useOrderStore } from '@/store/orderStore';
import { formatCurrency } from '@/utils/format';
import Header from '@/components/layout/header';
import { useRouter } from 'next/navigation';

export default function OrderHistoryPage() {
  const { orders } = useOrderStore();
  const router = useRouter();

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header title='주문내역' showBackButton />

      {orders.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-full text-center flex-grow'>
          <p className='text-xl text-black font-semibold'>주문내역이 없습니다.</p>
          <button 
            onClick={() => router.push('/')} 
            className='mt-4 px-10 py-4 bg-black text-lg text-white rounded-lg font-bold'
          >
            메뉴 보러가기
          </button>
        </div>
      ) : (
        <div className='p-4 space-y-4'>
          {orders.map((order) => (
            <div key={order.id} className='bg-white rounded-lg shadow-sm p-4'>
              <div className='border-b pb-2 mb-2 flex justify-between items-center'>
                <h3 className='font-bold text-lg'>
                  {new Date(order.date).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </h3>
                <span className='font-bold text-lg'>{formatCurrency(order.totalPrice)}</span>
              </div>
              <div className='space-y-2'>
                {order.items.map((item) => (
                  <div key={item.id} className='flex justify-between text-gray-600'>
                    <span>{item.title} x {item.quantity}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
