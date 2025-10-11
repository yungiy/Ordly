import { useState, useEffect } from 'react';
import { fetchMenus, MenuItemWithCategory } from '@/features/menus/menus.api';
import { Category as CategoryType } from '@/generated/prisma';

export function useMenus() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useState<MenuItemWithCategory[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const getMenus = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMenus();
        setItems(data);

        const uniqueCategories = Array.from(
          new Map(data.map((item) => [item.Category.id, item.Category])).values()
        );
        uniqueCategories.sort((a, b) => a.order - b.order);
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다.'));
        console.error('Failed to fetch menus:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getMenus();
  }, []);

  return { isLoading, error, items, categories };
}