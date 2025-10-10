'use client';

import { useRouter } from 'next/navigation';

export default function OrderHistoryEmpty() {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center h-full text-center flex-grow'>
      <p className='text-xl text-black font-semibold'>주문내역이 없습니다.</p>
      <button
        onClick={() => router.push('/')}
        className='mt-4 px-10 py-4 bg-black text-lg text-white rounded-lg font-bold'
      >
        메뉴 보러가기
      </button>
    </div>
  );
}

