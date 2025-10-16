import 'server-only'; // 이 파일이 서버에서만 사용됨을 명시
import { Category, MenuItem } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export type MenuItemWithCategory = Omit<MenuItem, 'price'> & {
  price: string;
  Category: Category;
};

export type MenuItemForClient = Omit<MenuItemWithCategory, 'price'> & {
  price: number;
};

export async function fetchMenus(): Promise<MenuItemWithCategory[]> {
  console.log('1. [menus.api.ts] fetchMenus: 메뉴 데이터 fetching 시작');
  const response = await fetch('/api/menus');
  console.log('2. [menus.api.ts] fetchMenus: API 응답 받음', response);

  if (!response.ok) {
    console.error('3. [menus.api.ts] fetchMenus: API 응답 실패', response.status, response.statusText);
    throw new Error('메뉴 데이터를 불러오는데 실패했습니다.');
  }

  const data = await response.json();
  console.log('4. [menus.api.ts] fetchMenus: JSON 파싱 완료', data);
  return data;
}

/**
 * 서버 컴포넌트에서 메뉴 데이터를 직접 가져오는 함수
 */
export async function getMenusForServer(): Promise<MenuItemWithCategory[]> {
  const menuItems = await prisma.menuItem.findMany({
    include: {
      Category: true,
    },
    orderBy: [{ Category: { order: 'asc' } }, { name: 'asc' }],
  });

  // Decimal 타입을 문자열로 변환
  const serializedMenus = menuItems.map((item) => ({
    ...item,
    price: item.price.toString(),
  }));

  return serializedMenus;
}