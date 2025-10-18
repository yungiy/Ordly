import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderNumbersParam = searchParams.get('orderNumbers');

  try {
    const whereClause = orderNumbersParam
      ? {
          orderNumber: {
            in: JSON.parse(orderNumbersParam),
          },
        }
      : {};

    const orders = await prisma.order.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc', 
      },
      include: {
        OrderItem: {
          include: {
            MenuItem: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: '주문 내역 조회 중 서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}