'use client';

import CouponBanner from '@/features/coupon/coupon-banner';
import { useMemo } from 'react';
import StoreBanner from '@/features/store/store-banner';
import StoreProfile from '@/features/store/store-profile';
import { useQuery } from '@tanstack/react-query';
import { fetcher, StoreWithCategories } from '@/features/store/store.api';

export default function MainHeaders() {
  const { data: store } = useQuery<StoreWithCategories>({
    queryKey: ['store'],
    queryFn: () => fetcher('/api/store'),
  });

  const { firstMenuImageUrl, storeName } = useMemo(() => {
    const firstMenuImageUrl = store?.Category?.[0]?.MenuItem?.[0]?.imageUrl;
    const storeName = store?.name;
    return { firstMenuImageUrl, storeName };
  }, [store]);

  return (
    <header className='bg-white pb-2'>
      <StoreBanner imageUrl={firstMenuImageUrl} />
      <div className='px-4 pt-4'>
        <StoreProfile name={storeName} />
        <CouponBanner />
      </div>
    </header>
  );
}
