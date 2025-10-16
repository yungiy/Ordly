import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!menuItem) {
      return NextResponse.json({ message: '메뉴를 찾을 수 없습니다.' }, { status: 404 });
    }

    // Decimal 타입을 문자열로 변환하여 직렬화 오류 방지
    const serializedMenu = {
      ...menuItem,
      price: menuItem.price.toString(),
    };

    return NextResponse.json(serializedMenu);
  } catch (error) {
    return NextResponse.json({ message: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}