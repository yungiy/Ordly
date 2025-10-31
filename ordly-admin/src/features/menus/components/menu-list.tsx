import Button from '@/components/common/button';
import CardItem from '@/components/common/card-item';
import { Menus } from '@/types/types';
import { PlusCircle } from 'lucide-react';
import MenuItem from './menu-item';

type Props = {
  menus: Menus[];
  onSelectMenu: (menu: Menus) => void;
  onDeleteRequest: (id: string) => void;
  onAddNewMenu: () => void;
};

export default function MenuList({
  menus,
  onAddNewMenu,
  onSelectMenu,
  onDeleteRequest,
}: Props) {
  const groupedMenus = menus.reduce((index, menu) => {
    (index[menu.category.name] = index[menu.category.name] || []).push(menu);
    return index;
  }, {} as Record<string, Menus[]>);

  return (
    <CardItem className='flex flex-col overflow-auto scrollbar-hide '>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>메뉴 목록</h2>
        <Button
          onClick={onAddNewMenu}
          className='w-auto h-auto bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2'
        >
          <PlusCircle size={20} />새 메뉴 추가
        </Button>
      </div>
      <div className='pr-2 overflow-auto'>
        {Object.entries(groupedMenus).map(([category, items]) => (
          <div key={category} className='mb-6'>
            <div className='flex justify-between items-center mb-3 px-1 py-2 border-b border-gray-200'>
              <h3 className='font-bold text-lg text-gray-800'>{category}</h3>
              <span className='bg-gray-700 text-white px-2.5 font-bold rounded-full'>
                {items.length}
              </span>
            </div>
            <div className='flex flex-col'>
              {items.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onSelect={() => onSelectMenu(item)}
                  onDelete={onDeleteRequest}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardItem>
  );
}
