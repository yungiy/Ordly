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

    const serializedMenus = menuItems.map((item:any) => ({
      ...item,
      price: item.price.toString(),
    }));

    return NextResponse.json(serializedMenus);
  } catch (error) {
    return NextResponse.json(
      { message: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
