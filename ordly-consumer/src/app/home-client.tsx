'use client';

import MenuList from '@/features/menus/menu-list';
import BottomBar from '@/components/layout/bottom-bar';
import Category from '@/features/menus/category';
import { useCategoryScroll } from '@/hooks/useCategoryScroll.hooks';
import { useMenus } from '@/hooks/useMenus.hooks';
import MenusSkeleton from '@/components/skeleton/menus-skeleton';

export default function HomeClient() {
  const { isLoading, error, items, categories } = useMenus();

  const { activeCategory, handleCategoryClick, categoryRefs } = useCategoryScroll(
    categories.map((c) => c.name)
  );

  if (isLoading) return <MenusSkeleton/>
  if (error) return <div>오류: {error.message}</div>;

  return (
    <>
      <Category
        categories={categories}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />
      <MenuList menus={items} categoryRefs={categoryRefs} /> {/* menus prop으로 수정 */}
      <BottomBar />
    </>
  );
}
