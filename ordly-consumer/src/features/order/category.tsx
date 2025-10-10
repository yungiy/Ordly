import { forwardRef } from 'react';
import Button from '@/components/common/button';

type Props = {
  categories: string[];
  onCategoryClick: (category: string) => void;
  activeCategory: string;
}

const Classification = forwardRef<HTMLElement, Props>(
  ({ categories, onCategoryClick, activeCategory }, ref) => {
    return (
      <section
        ref={ref}
        className='sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3'
      >
        <div className='flex items-center gap-2 overflow-x-auto hide-scrollbar'>
          {categories.map((category, index) => (
            <Button
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold h-auto w-auto ${
                category === activeCategory
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black hover:bg-black hover:text-white transition-colors'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>
    );
  }
);

Classification.displayName = 'Classification';

export default Classification;
