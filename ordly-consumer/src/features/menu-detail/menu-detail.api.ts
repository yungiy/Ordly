import { prisma } from '@/lib/prisma';
import { Category, MenuItem } from '@/generated/prisma';

export type MenuItemDetail = Omit<MenuItem, 'price' | 'description'> & {
  Category: Category;
  price: number;
  description: string | null;
};

export async function fetchMenuDetail(id: string): Promise<MenuItemDetail | null> {
  const menuItem = await prisma.menuItem.findUnique({
    where: { id },
    include: {
      Category: true,
    },
  });

  if (!menuItem) {
    return null;
  }

  // Prisma의 Decimal 타입을 숫자로, description이 null일 경우를 처리합니다.
  return {
    ...menuItem,
    price: menuItem.price.toNumber(),
    description: menuItem.description ?? null,
  };
}