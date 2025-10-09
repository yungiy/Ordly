"use client";

import OrderList from '@/features/order/order-list';
import BottomBar from '@/components/layout/bottom-bar';
import Category from '@/features/order/category';
import { useCategoryScroll } from '@/hooks/useCategoryScroll.hooks';

export default function HomeClient({ categories }: { categories: string[] }) {
  const { 
    activeCategory, 
    handleCategoryClick, 
    categoryRefs, 
    categoryHeaderRef 
  } = useCategoryScroll(categories);

  return (
    <>
      <Category
        ref={categoryHeaderRef}
        categories={categories}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />
      <OrderList categoryRefs={categoryRefs} />
      <BottomBar />
    </>
  );
}
