import { Menus } from '@/types/types';

export const getMenus = async (): Promise<Menus[]> => {
  const response = await fetch('/api/menus');
  if (!response.ok) {
    throw new Error('메뉴를 불러오는데 실패했습니다.');
  }
  return response.json();
};
