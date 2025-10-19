import MainHeaders from '@/components/layout/main-headers';
import HomeClient from './home-client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchMenus } from '@/features/menus/menus.api';
import MainPageSkeleton from '@/components/skeleton/main-page-skeleton';
import { Suspense } from 'react';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['menus'], queryFn: fetchMenus });
  return (
    <>
      <div className='bg-white pb-20 hide-scrollbar'>
        <MainHeaders />
        <Suspense fallback={<MainPageSkeleton />}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <HomeClient />
          </HydrationBoundary>
        </Suspense>
      </div>
    </>
  );
}
