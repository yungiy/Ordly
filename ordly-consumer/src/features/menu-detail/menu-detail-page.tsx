'use client';

import { notFound, useParams } from 'next/navigation';
import MenuImage from '@/features/menu-detail/menu-image';
import MenuInfo from '@/features/menu-detail/menu-info';
import MenuActions from '@/features/menu-detail/menu-actions';
import MenuDetailSkeleton from '@/components/skeleton/menu-detail-skeleton';
import { useMenuDetail } from '@/hooks/useMenuDetail.hooks';

export default function MenuDetailPage() {
  const params = useParams();
  const { id } = params;
  const { item, isLoading, error } = useMenuDetail(id);

  if (isLoading) return <MenuDetailSkeleton />;
  if (error || !item) {
    notFound();
  }

  const { imageUrl, name, description, price } = item;

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <main className='flex-grow pb-32'>
        {imageUrl && <MenuImage src={imageUrl} alt={name} />}
        <MenuInfo title={name} price={price} description={description} />
      </main>
      <MenuActions id={item.id} price={price} title={name} />
    </div>
  );
}
