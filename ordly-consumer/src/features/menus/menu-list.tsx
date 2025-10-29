import { RefObject, useMemo, memo, useCallback } from 'react';
import MenuItemComponent from './menu-item';
import { MenuItemForClient } from './menus.api';

type Props = {
  menus: MenuItemForClient[];
  categoryRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
};

type MenuItemWithDivider = MenuItemForClient & {
  _showDivider: boolean;
};

function MenuList({ menus, categoryRefs }: Props) {
  const menusWithDividerInfo: MenuItemWithDivider[] = useMemo(() => {
    if (!menus || menus.length === 0) {
      return [];
    }

    let prevCategoryName = '';
    return menus.map((item) => {
      const showDivider = item.Category.name !== prevCategoryName;
      prevCategoryName = item.Category.name;
      return { ...item, _showDivider: showDivider };
    });
  }, [menus]);

  const setCategoryRef = useCallback(
    (categoryName: string) => (el: HTMLDivElement | null) => {
      if (categoryRefs && categoryRefs.current) {
        categoryRefs.current[categoryName] = el;
      }
    },
    [categoryRefs]
  );

  return (
    <div className='px-2 pb-4 bg-gray-50'>
      <div className='space-y-3'>
        {menusWithDividerInfo.map((item, index) => {
          return (
            <div key={item.id}>
              {item._showDivider && (
                <div
                  className='py-2 flex items-center gap-2'
                  ref={setCategoryRef(item.Category.name)}
                >
                  <hr className='flex-grow border-t-2 border-gray-300' />
                  <span className='px-3 py-1 text-xs font-bold text-gray-600 bg-gray-100 rounded-full'>
                    {item.Category.name}
                  </span>
                  <hr className='flex-grow border-t-2 border-gray-300' />
                </div>
              )}
              <MenuItemComponent menus={item} priority={index < 5} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(MenuList);
