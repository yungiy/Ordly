'use client';

import { notFound, useParams } from 'next/navigation';
import { ITEMS } from '@/constants';
import MenuImage from '@/features/menu-detail/menu-image';
import MenuInfo from '@/features/menu-detail/menu-info';
import MenuActions from '@/features/menu-detail/menu-actions';

export default function MenuDetailPage() {
  const params = useParams();
  const { id } = params;

  const item = ITEMS.find((i) => i.id.toString() === id);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-grow pb-32">
        <MenuImage imageUrl={item.image} title={item.title} />
        <MenuInfo
          title={item.title}
          price={item.price}
          description={item.description}
          badge={item.badge}
        />
      </main>
      <MenuActions id={item.id} price={item.price} title={item.title} />
    </div>
  );
}
