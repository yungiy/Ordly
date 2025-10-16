import { useQuery } from '@tanstack/react-query';
import { fetchMenus } from '@/features/menus/menus.api';

export function useMenus() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['menus'],
    queryFn: fetchMenus,
  });

  return {
    isLoading,
    error: error,
    items: data?.items ?? [],
    categories: data?.categories ?? [],
  };
}