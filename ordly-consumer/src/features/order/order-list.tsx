import { RefObject } from 'react';
import { ITEMS } from '@/constants';
import OrderItem from './order-item';

type Props = {
  categoryRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
}

export default function OrderList({ categoryRefs }: Props) {
  let prevCategory = '';
  return (
    <div className='px-4 py-2 bg-gray-50'>
      <div className='space-y-6'>
        {ITEMS.map((item) => {
          const showDivider = item.category !== prevCategory;
          const refProp = showDivider
            ? {
                ref: (el: HTMLDivElement | null) => {
                  if (categoryRefs && categoryRefs.current) {
                    categoryRefs.current[item.category] = el;
                  }
                },
              }
            : {};
          prevCategory = item.category;
          return (
            <div key={item.id}>
              {showDivider && (
                <div className='py-2 flex items-center gap-2' {...refProp}>
                  <hr className='flex-grow border-t-2 border-gray-300' />
                  <span className='px-3 py-1 text-xs font-bold text-gray-600 bg-gray-100 rounded-full'>
                    {item.category}
                  </span>
                  <hr className='flex-grow border-t-2 border-gray-300' />
                </div>
              )}
              <OrderItem item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
