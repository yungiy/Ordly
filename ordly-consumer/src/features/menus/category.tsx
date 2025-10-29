'use client';

import { forwardRef } from 'react';
import Button from '@/components/common/button';
import { Category as CategoryType } from '@/generated/prisma';

type Props = {
  categories: CategoryType[];
  onCategoryClick: (category: string) => void;
  activeCategory: string;
};

const Classification = forwardRef<HTMLElement, Props>(
  ({ categories, onCategoryClick, activeCategory }, ref) => {
    return (
      <section
        ref={ref}
        className='sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 hide-scrollbar'
      >
        <div className='flex items-center gap-2 overflow-x-auto hide-scrollbar'>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => onCategoryClick(category.name)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold h-auto w-auto ${
                category.name === activeCategory
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black hover:bg-black hover:text-white transition-colors'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </section>
    );
  }
);

Classification.displayName = 'Classification';

export default Classification;
