'use client';

import Category from '@/features/menus/category';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useCategoryScroll } from '@/hooks/useCategoryScroll.hooks';
import { useMenus } from '@/hooks/useMenus.hooks';
import dynamic from 'next/dynamic';
import MenusSkeleton from '@/components/skeleton/menus-skeleton';
import { useEffect, useMemo, useRef, useState } from 'react';

const MenuList = dynamic(() => import('@/features/menus/menu-list'), {
  ssr: false,
  loading: () => <MenusSkeleton />,
});

const Footers = dynamic(() => import('@/components/layout/footers'), {
  ssr: false,
});

const BottomBar = dynamic(() => import('@/components/layout/bottom-bar'), {
  ssr: false,
});

export default function HomeClient() {
  const { items, categories, isLoading } = useMenus();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFooterVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (footerTriggerRef.current) {
      observer.observe(footerTriggerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const categoryNames = useMemo(() => {
    return categories ? categories.map((c) => c.name) : [];
  }, [categories]);

  const { activeCategory, handleCategoryClick, categoryRefs, categoryHeaderRef } =
    useCategoryScroll(categoryNames);

  return (
    <>
      <Category
        categoryHeaderRef={categoryHeaderRef}
        categories={categories}
        onCategoryClick={handleCategoryClick}
        activeCategory={activeCategory}
      />
      {isLoading ? (
        <MenusSkeleton />
      ) : (
        <MenuList menus={items} categoryRefs={categoryRefs} />
      )}
      <div ref={footerTriggerRef} />
      <BottomBar />
      {isFooterVisible && <Footers />}
    </>
  );
}
