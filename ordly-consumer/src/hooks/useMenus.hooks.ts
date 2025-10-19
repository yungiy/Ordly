import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchMenus,
  MenuItemForClient,
  MenuItemWithCategory,
} from '@/features/menus/menus.api';

export function useMenus() {
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery<MenuItemWithCategory[], Error, MenuItemForClient[]>({
    queryKey: ['menus'],
    queryFn: fetchMenus,
    select: (data) =>
      data.map((item) => ({ ...item, price: Number(item.price) })),
  });

  const categories = useMemo(() => {
    if (!items) return [];
    const uniqueCategories = Array.from(
      new Map(items.map((item) => [item.Category.id, item.Category])).values()
    );
    uniqueCategories.sort((a, b) => a.order - b.order);
    return uniqueCategories;
  }, [items]);

  return { isLoading, error, items, categories };
}