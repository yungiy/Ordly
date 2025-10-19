import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params;

    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!menuItem) {
      return NextResponse.json(
        { error: '메뉴를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const serializedMenu = {
      ...menuItem,
      price: menuItem.price.toString(),
    };

    return NextResponse.json(serializedMenu);
  } catch (error) {
    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}