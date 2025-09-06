'use client';

import Header from '@/components/layout/header';
import KakaoMap from '@/components/store/map';

export default function StorePage() {
  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header title='매장 정보' showBackButton />
      <main className='flex-grow'>
        <div className='p-4'>
          <div className='bg-white px-4 py-6 shadow-sm'>
            <h2 className='text-2xl font-bold pb-2'>매장 정보</h2>
            <div className='space-y-2'>
              <div style={{ height: '400px' }}>
                <KakaoMap />
              </div>
              <p>
                <strong>주소:</strong> 서울특별시 강남구 테헤란로 123
              </p>
              <p>
                <strong>전화번호:</strong> 02-1234-5678
              </p>
              <p>
                <strong>영업시간:</strong> 매일 09:00 - 22:00
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
