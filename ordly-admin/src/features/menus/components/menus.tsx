'use client';

import MenuList from './menu-list';
import { Menus } from '@/types/types';
import { useState } from 'react';
import CardItem from '@/components/common/card-item';
import MenuForm from './menu-form';

const sampleMenus: Menus[] = [
  {
    id: 1,
    category: '커피',
    name: '아메리카노',
    description: '진한 에스프레소와 물의 조화',
    price: 4000,
    isAvailable: true,
  },
  { id: 2, category: '커피', name: '카페라떼', price: 4500, isAvailable: true },
  {
    id: 3,
    category: '디저트',
    name: '치즈케이크',
    description: '뉴욕 스타일의 꾸덕한 치즈케이크',
    price: 6500,
    isAvailable: false,
  },
  {
    id: 4,
    category: '디저트',
    name: '초코쿠키',
    price: 3000,
    image: 'https://picsum.photos/id/203/64/64',
    isAvailable: true,
  },
];

export default function Menu() {
  
const [selectedMenu, setSelectedMenu] = useState<Menus | 'new' | null>(null);

  const handleSelectMenu = (menu: Menus) => {
    setSelectedMenu(menu);
  };

  const handleAddNewMenu = () => {
    setSelectedMenu('new');
  };

  const handleCloseForm = () => {
    setSelectedMenu(null);
  };

  return (
    <div className='h-full flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
      <div className='md:col-span-1 h-full'>
        <MenuList 
          menus={sampleMenus} 
          onSelectMenu={handleSelectMenu}
          onAddNewMenu={handleAddNewMenu}
        />
      </div>

      <div className='md:col-span-1 h-full'>
        {selectedMenu ? (
          <MenuForm selectedMenu={selectedMenu} onClose={handleCloseForm} />
        ) : (
          <CardItem className="h-full flex items-center justify-center">
            <p className="text-gray-500">왼쪽에서 메뉴를 선택하거나 새 메뉴를 추가하세요.</p>
          </CardItem>
        )}
      </div>
    </div>
  );
}
