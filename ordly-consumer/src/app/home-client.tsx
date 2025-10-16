'use client';

import { useState } from 'react';
import MenuList from '@/features/menus/menu-list';
import BottomBar from '@/components/layout/bottom-bar';
import Category from '@/features/menus/category';
import { useCategoryScroll } from '@/hooks/useCategoryScroll.hooks';
import {
  MenuItemForClient,
  MenuItemWithCategory,
} from '@/features/menus/menus.api';
import { Category as CategoryType } from '@/generated/prisma';

type HomeClientProps = {
  initialMenus: MenuItemWithCategory[];
};

export default function HomeClient({ initialMenus }: HomeClientProps) {
  const [items] = useState<MenuItemForClient[]>(() =>
    initialMenus.map((item) => ({ ...item, price: Number(item.price) }))
  );
  const [categories] = useState<CategoryType[]>(() => {
    const uniqueCategories = Array.from(
      new Map(
        initialMenus.map((item) => [item.Category.id, item.Category])
      ).values()
    );
    uniqueCategories.sort((a, b) => a.order - b.order);
    return uniqueCategories;
  });

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
    </>
  );
}
