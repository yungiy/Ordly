import { useQuery } from '@tanstack/react-query';
import type { MenuItem } from '@/generated/prisma';
import { fetcher } from '../features/store/store.api';

export type MenuItemWithNumberPrice = Omit<MenuItem, 'price'> & {
  price: number;
};

export function useMenuDetail(id: string | string[] | undefined) {
  const {
    data: item,
    isLoading,
    error,
  } = useQuery<MenuItemWithNumberPrice>({
    queryKey: ['menu', id],
    queryFn: () => fetcher(`/api/menus/${id}`),
    enabled: !!id,
  });

  return { item, isLoading, error };
}