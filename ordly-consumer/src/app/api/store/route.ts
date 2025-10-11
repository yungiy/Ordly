import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const store = await prisma.store.findFirst({
      include: {
        Category: {
          include: {
            MenuItem: true,
          },
        },
      },
    });

    if (!store) {
      return NextResponse.json({ message: '매장 정보를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(store);
  } catch (error) {
    return NextResponse.json({ message: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}