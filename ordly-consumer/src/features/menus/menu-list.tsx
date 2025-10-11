import { RefObject } from 'react';
import { Category, MenuItem } from '@/generated/prisma';
import MenuItemComponent from './menu-item';

type MenuItemWithCategory = MenuItem & {
  Category: Category;
};

type Props = {
  menus: MenuItemWithCategory[];
  categoryRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
};

export default function MenuList({ menus, categoryRefs }: Props) {
  let prevCategory = '';
  return (
    <div className='px-4 py-2 bg-gray-50'>
      <div className='space-y-6'>
        {menus.map((item: MenuItemWithCategory) => {
          const showDivider = item.Category.name !== prevCategory;
          const refProp = showDivider
            ? {
                ref: (el: HTMLDivElement | null) => {
                  if (categoryRefs && categoryRefs.current) {
                    categoryRefs.current[item.Category.name] = el;
                  }
                },
              }
            : {};
          prevCategory = item.Category.name;
          return (
            <div key={item.id}>
              {showDivider && (
                <div className='py-2 flex items-center gap-2' {...refProp}>
                  <hr className='flex-grow border-t-2 border-gray-300' />
                  <span className='px-3 py-1 text-xs font-bold text-gray-600 bg-gray-100 rounded-full'>
                    {item.Category.name}
                  </span>
                  <hr className='flex-grow border-t-2 border-gray-300' />
                </div>
              )}
              <MenuItemComponent menus={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
