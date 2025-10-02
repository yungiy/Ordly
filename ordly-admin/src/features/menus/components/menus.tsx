'use client';

import MenuList from './menu-list';
import { Category, Menus } from '@/types/types';
import { useState, useEffect } from 'react';
import CardItem from '@/components/common/card-item';
import MenuForm from './menu-form';
import { useGetMenus } from '@/hooks/useMenus.hooks';
import MenuSkeleton from '@/components/skeleton/menu-skeleton';
import { useQueryClient } from '@tanstack/react-query';

export default function Menu() {
  const { data: menus, isLoading, isError } = useGetMenus();
  const [selectedMenu, setSelectedMenu] = useState<Menus | 'new' | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSelectMenu = (menu: Menus) => {
    setSelectedMenu(menu);
  };

  const handleAddNewMenu = () => {
    setSelectedMenu('new');
  };

  const handleCloseForm = () => {
    setSelectedMenu(null);
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['menus'] });
    handleCloseForm();
  };

  if (isLoading) {
    return <MenuSkeleton />;
  }

  if (isError) {
    return <div>에러가 발생했습니다...</div>
  }

  return (
    <div className="h-full flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 scrollbar-hide">
      <div className="md:col-span-1 h-full overflow-hidden scrollbar-hide">
        <MenuList
          menus={menus || []}
          onSelectMenu={handleSelectMenu}
          onAddNewMenu={handleAddNewMenu}
        />
      </div>

      <div className="md:col-span-1 h-full overflow-hidden scrollbar-hide">
        {selectedMenu ? (
          <MenuForm
            selectedMenu={selectedMenu}
            onClose={handleCloseForm}
            onSuccess={handleSuccess}
            categories={categories}
          />
        ) : (
          <CardItem className="h-full flex items-center justify-center">
            <p className="text-gray-500">
              왼쪽에서 메뉴를 선택하거나 새 메뉴를 추가하세요.
            </p>
          </CardItem>
        )}
      </div>
    </div>
  );
}
