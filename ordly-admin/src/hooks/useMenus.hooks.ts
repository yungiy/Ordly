import { useQuery } from '@tanstack/react-query';
import { getMenus } from '@/features/menus/api/menus.api';

export const useMenus = () => {
  return useQuery({
    queryKey: ['menus'],
    queryFn: getMenus,
  });
};
