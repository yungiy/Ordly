import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category, MenuItem } from '@/generated/prisma';

export type MenuWithCategory = MenuItem & {
  Category: Category;
};

export async function GET() {
  try {
    console.log('A. [/api/menus] GET 요청 받음');
    const menuItems = await prisma.menuItem.findMany({
      include: {
        Category: true,
      },
      orderBy: [{ Category: { order: 'asc' } }, { name: 'asc' }],
    });
    console.log('B. [/api/menus] Prisma 조회 완료', menuItems);

    const serializedMenus = menuItems.map((item) => ({
      ...item,
      price: item.price.toString(),
    }));

    return NextResponse.json(serializedMenus);
  } catch (error) {
    console.error('C. [/api/menus] 서버 오류 발생:', error);
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
