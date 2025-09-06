'use client';

import { notFound, useParams } from 'next/navigation';
import { ITEMS } from '@/constants/items';
import ItemImage from '@/components/item-detail/item-image';
import ItemInfo from '@/components/item-detail/item-info';
import ItemActions from '@/components/item-detail/item-actions';

export default function ItemDetailPage() {
  const params = useParams();
  const { id } = params;

  const item = ITEMS.find((i) => i.id.toString() === id);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-grow pb-32">
        <ItemImage imageUrl={item.image} title={item.title} />
        <ItemInfo
          title={item.title}
          price={item.price}
          description={item.description}
          badge={item.badge}
        />
      </main>
      <ItemActions id={item.id} price={item.price} title={item.title} />
    </div>
  );
}
