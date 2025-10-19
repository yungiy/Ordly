import { Suspense } from 'react';
import PayCompleteClient from './pay-complete-client';

function Loading() {
  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <div className='flex-grow flex flex-col items-center justify-center text-center p-4'>
        <div className='w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500' />
        <h2 className='text-2xl font-bold mt-4'>결제 정보를 확인 중입니다...</h2>
      </div>
    </div>
  );
}

export default function PayCompletePage() {
  return (
    <Suspense fallback={<Loading />}>
      <PayCompleteClient />
    </Suspense>
  );
}