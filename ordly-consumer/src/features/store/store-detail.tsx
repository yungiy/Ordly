'use client';

import Header from '@/components/layout/header';
import dynamic from 'next/dynamic';
import StoreInfo from './store-info';
import { StoreWithCategories } from './store.api';
import { formatHours } from '@/utils/format-hour';

const KakaoMap = dynamic(() => import('./map'), {
  ssr: false,
  loading: () => <div className='w-full h-full bg-gray-200 animate-pulse' />,
});

type Props = {
  store: StoreWithCategories;
};

export default function StoreDetail({ store }: Props) {
  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header title={store.name} showBackButton={true} />
      <main className='flex-grow p-4 space-y-4 overflow-y-auto'>
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='w-full h-78 md:h-96 p-4'>
            <KakaoMap address={store.address} />
          </div>
          <StoreInfo
            address={store.address}
            phone={store.phone}
            hours={formatHours(store.hour)}
          />
        </div>
      </main>
    </div>
  );
}