import { RefObject } from 'react';
import MenuItemComponent from './menu-item';
import { MenuItemForClient } from './menus.api';

type Props = {
  menus: MenuItemForClient[];
  categoryRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
};

export default function MenuList({ menus, categoryRefs }: Props) {
  let prevCategory = '';
  return (
    <div className='px-2 pb-4 bg-gray-50'>
      <div className='space-y-3'>
        {menus.map((item) => {
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
