'use client';

import { useRouter } from 'next/navigation';

export default function CartEmpty() {
  const router = useRouter();
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
