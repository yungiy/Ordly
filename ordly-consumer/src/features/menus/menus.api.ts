import 'server-only'; // 이 파일이 서버에서만 사용됨을 명시
import { Category, MenuItem, MenuStatus } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export type MenuItemWithCategory = Omit<MenuItem, 'price'> & {
  price: string;
  Category: Category;
  status: MenuStatus;
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

export async function getMenusForServer(): Promise<MenuItemWithCategory[]> {
  const menuItems = await prisma.menuItem.findMany({
    include: {
      Category: true,
    },
    orderBy: [{ Category: { order: 'asc' } }, { name: 'asc' }],
  });


  const serializedMenus = menuItems.map((item) => ({
    ...item,
    price: item.price.toString(),
  }));

  return serializedMenus;
}
