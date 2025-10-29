'use client';

import Category from '@/features/menus/category';
import { useCategoryScroll } from '@/hooks/useCategoryScroll.hooks';
import { useMenus } from '@/hooks/useMenus.hooks';
import dynamic from 'next/dynamic';
import MenusSkeleton from '@/components/skeleton/menus-skeleton';

const MenuList = dynamic(() => import('@/features/menus/menu-list'), {
  ssr: false,
  loading: () => <MenusSkeleton />,
});

const BottomBar = dynamic(() => import('@/components/layout/bottom-bar'), {
  ssr: false,
});

const Footers = dynamic(() => import('@/components/layout/footers'), {
  ssr: false,
});

export default function HomeClient() {
  const { items, categories } = useMenus();

  const { activeCategory, handleCategoryClick, categoryRefs } =
    useCategoryScroll(categories ? categories.map((c) => c.name) : []);

  return (
    <>
      <Category
        categories={categories}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />
      <MenuList menus={items} categoryRefs={categoryRefs} />
      <BottomBar />
      <Footers />
    </>
  );
}
