'use client';

import { notFound, useParams } from 'next/navigation';
import MenuImage from '@/features/menu-detail/menu-image';
import MenuInfo from '@/features/menu-detail/menu-info';
import MenuActions from '@/features/menu-detail/menu-actions';
import { useQuery } from '@tanstack/react-query';
import { MenuItem } from '@/generated/prisma';
import { fetcher } from '../store/store.api';
import MenuDetailSkeleton from '@/components/skeleton/menu-detail-skeleton';

type MenuItemWithNumberPrice = Omit<MenuItem, 'price'> & {
  price: number;
};

export default function MenuDetailPage() {
  const params = useParams();
  const { id } = params;

  const {
    data: item,
    isLoading,
    error,
  } = useQuery<MenuItemWithNumberPrice>({
    queryKey: ['menu', id],
    queryFn: () => fetcher(`/api/menus/${id}`),
    enabled: !!id,
  });

  if (isLoading) return <MenuDetailSkeleton />;
  if (error || !item) {
    notFound();
  }

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <main className='flex-grow pb-32'>
       {item.imageUrl && <MenuImage src={item.imageUrl} title={item.name} alt={item.name} />}
        <MenuInfo
          title={item.name}
          price={item.price}
          description={item.description}
        />
      </main>
      <MenuActions id={item.id} price={item.price} title={item.name} />
    </div>
  );
}
