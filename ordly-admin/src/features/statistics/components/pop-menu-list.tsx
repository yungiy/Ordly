'use client';

import Button from '@/components/common/button';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CardItem from '@/components/common/card-item';
import PopularMenuItem from './pop-menu-item';
import MenuListSkeleton from '@/components/skeleton/menu-list-skeleton';

type MenuData = {
  rank: number;
  name: string;
  orders: number;
};

const fetchPopularMenus = async (period: string): Promise<MenuData[]> => {
  const response = await fetch(
    `/api/statistics/popular-menus?period=${period}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function PopMenuList() {
  const [period, setPeriod] = useState('monthly');
  const periods = [
    { value: 'monthly', label: '이번달' },
    { value: 'six-months', label: '6개월' },
    { value: 'yearly', label: '1년' },
  ];

  const { data: menus, isLoading } = useQuery({
    queryKey: ['popularMenus', period],
    queryFn: () => fetchPopularMenus(period),
  });

  return (
    <CardItem className='flex flex-col'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='font-bold text-xl'>인기 메뉴</h2>
        <div className='flex items-center p-1 bg-gray-100 rounded-lg flex-nowrap'>
          {periods.map((p) => (
            <Button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`
                px-4 py-2 text-xs font-semibold rounded-md transition-colors 
                w-auto h-auto flex-1 whitespace-nowrap
                ${
                  period === p.value
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'bg-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {p.label}
            </Button>
          ))}
        </div>
      </div>
      <div className='flex-grow overflow-y-auto pr-2'>
        {isLoading ? (
          <MenuListSkeleton />
        ) : (
          menus?.map((menu) => (
            <PopularMenuItem
              key={menu.rank}
              rank={menu.rank}
              name={menu.name}
              orders={menu.orders}
            />
          ))
        )}
      </div>
    </CardItem>
  );
}
