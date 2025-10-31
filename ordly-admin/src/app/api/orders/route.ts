import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { transformOrder } from '@/utils/order';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const storeId = session.user.storeId;
    const ordersFromDb = await prisma.order.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const orders = ordersFromDb.map(transformOrder);

    return NextResponse.json(orders);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('[GET /api/orders] Error fetching orders:', { errorMessage, error });
    return NextResponse.json({ error: '주문 목록을 가져오는 데 실패했습니다.' }, { status: 500 });
  }
}