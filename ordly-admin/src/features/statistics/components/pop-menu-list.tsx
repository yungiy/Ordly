'use client';

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

  const { data: menus, isLoading } = useQuery({
    queryKey: ['popularMenus', period],
    queryFn: () => fetchPopularMenus(period),
  });

  return (
    <CardItem>
      <div className='flex justify-between pb-4'>
        <h2 className='flex items-center font-bold text-xl'>인기메뉴</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className='px-1 py-1 rounded-sm border-2 border-gray-400 text-gray-700 font-semibold focus:outline-none'
        >
          <option value='monthly'>이번달</option>
          <option value='six-months'>6개월</option>
          <option value='yearly'>1년</option>
        </select>
      </div>
      <div className='space-y-3 pt-2'>
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
