'use client';

import { RefObject, useCallback, useRef, useState } from 'react';
import { Category as CategoryType } from '@/generated/prisma';

type Props = {
  categories: CategoryType[];
  onCategoryClick: (category: string) => void;
  activeCategory: string;
  categoryHeaderRef: RefObject<HTMLElement | null>;
};

const INITIAL_VISIBLE_COUNT = 5; 
const LOAD_MORE_COUNT = 10;

export default function Category({
  categories,
  onCategoryClick,
  activeCategory,
  categoryHeaderRef,
}: Props) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastCategoryRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCount < categories.length) {
          setVisibleCount((prev) =>
            Math.min(prev + LOAD_MORE_COUNT, categories.length)
          );
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [visibleCount, categories.length]
  );

  return (
    <section
      ref={categoryHeaderRef}
      className='sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 hide-scrollbar'
    >
      <div className='flex items-center gap-2 overflow-x-auto hide-scrollbar'>
        {categories.slice(0, visibleCount).map((category, index) => (
          <button
            key={category.id}
            ref={index === visibleCount - 1 ? lastCategoryRef : null}
            onClick={() => onCategoryClick(category.name)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold h-auto w-auto ${
              category.name === activeCategory
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black hover:bg-black hover:text-white transition-colors duration-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}
