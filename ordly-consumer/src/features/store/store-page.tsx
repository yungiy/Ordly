'use client';

import Header from '@/components/layout/header';
import { useQuery } from '@tanstack/react-query';
import KakaoMap from './map';
import StoreInfo from './store-info';
import { fetcher, StoreWithCategories } from './store.api';
import StoreSkeleton from '@/components/skeleton/store-skeleton';
import { formatHours } from '@/utils/format-hour';

export default function StorePage() {
  const { data: store, isLoading } = useQuery<StoreWithCategories>({
    queryKey: ['store'],
    queryFn: () => fetcher('/api/store'),
  });

  if (isLoading || !store) {
    return <StoreSkeleton />;
  }

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
