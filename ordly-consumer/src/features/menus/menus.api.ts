import { Category, MenuItem } from '@/generated/prisma';

export type MenuItemWithCategory = MenuItem & {
  Category: Category;
};

export async function fetchMenus(): Promise<MenuItemWithCategory[]> {
  const response = await fetch('/api/menus');

  if (!response.ok) {
    throw new Error('메뉴 데이터를 불러오는데 실패했습니다.');
  }

  return response.json();
}