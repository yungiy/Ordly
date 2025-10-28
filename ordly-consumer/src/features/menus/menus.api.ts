import { Category, MenuItem, MenuStatus } from '@/generated/prisma';

export type MenuItemWithCategory = Omit<MenuItem, 'price'> & {
  price: string;
  Category: Category;
};

export type MenuItemForClient = Omit<MenuItemWithCategory, 'price'> & {
  price: number;
};

export async function fetchMenus(): Promise<MenuItemWithCategory[]> {
  const response = await fetch('/api/menus');

  if (!response.ok) {
    throw new Error('메뉴 데이터를 불러오는데 실패했습니다.');
  }

  const data = await response.json();

  return data;
}
