'use client';

import Header from '@/components/layout/header';
import KakaoMap from './map';
import StoreInfo from './store-info';


export default function StorePage() {
  const storeData = {
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    hours: '매일 09:00 - 22:00',
  };

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header title='매장 정보' showBackButton={true} />
      <main className='flex-grow p-4 space-y-4 overflow-y-auto'>
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='w-full h-80 md:h-96 p-4'>
            <KakaoMap address={storeData.address} />
          </div>
          <StoreInfo
            address={storeData.address}
            phone={storeData.phone}
            hours={storeData.hours}
          />
        </div>
      </main>
    </div>
  );
}
