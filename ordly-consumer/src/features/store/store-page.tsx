'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { fetcher, StoreWithCategories } from './store.api';
import StoreDetail from './store-detail';

const storeQuery = {
  queryKey: ['store'],
  queryFn: () => fetcher('/api/store'),
};

export default function StorePage() {
  const { data: store } = useSuspenseQuery<StoreWithCategories>(storeQuery);

  return (
    <StoreDetail store={store} />
  );
}
