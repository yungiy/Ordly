import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category, MenuItem } from '@/generated/prisma';

export type MenuWithCategory = MenuItem & {
  Category: Category;
};

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        Category: true,
      },
      orderBy: [{ Category: { order: 'asc' } }, { name: 'asc' }],
    });

    if (!menuItems || menuItems.length === 0) {
      return NextResponse.json({ message: '메뉴를 찾을 수 없습니다.' }, { status: 404 });
    }

    const menus = menuItems.map((item) => ({
      ...item,
      price: item.price.toNumber(),
    }));

    return NextResponse.json(menus);
  } catch (error) {
    console.error('메뉴 데이터를 가져오는 중 오류 발생:', error);
    return NextResponse.json({ message: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}
