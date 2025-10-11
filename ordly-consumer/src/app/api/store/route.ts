import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const store = await prisma.store.findFirst({
      include: {
        Category: true,
      },
    });

    if (!store) {
      return NextResponse.json({ error: '스토어를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}