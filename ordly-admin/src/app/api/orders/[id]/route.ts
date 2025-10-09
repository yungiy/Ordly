import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { Order } from '@/types/types';
import { reverseStatusMap, transformOrder } from '@/utils/order';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orderId = params.id;
  const storeId = session.user.storeId;

  try {
    const body = await request.json();
    const newStatus = body.status as Order['status'];

    // 요청 본문 유효성 검사
    if (!newStatus || !Object.keys(reverseStatusMap).includes(newStatus)) {
      return NextResponse.json({ error: '잘못된 상태 값입니다.' }, { status: 400 });
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId, storeId: storeId },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: '주문을 찾을 수 없거나 권한이 없습니다.' }, { status: 404 });
    }

    const prismaStatus = reverseStatusMap[newStatus];
    const updatedOrderWithItems = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: prismaStatus,
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    const updatedOrder = transformOrder(updatedOrderWithItems);

    return NextResponse.json(updatedOrder);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: '주문을 찾을 수 없습니다.' }, { status: 404 });
      }
    }
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error(`[PATCH /api/orders/${orderId}] Error updating order status:`, { errorMessage, error });
    return NextResponse.json({ error: '주문 상태 업데이트에 실패했습니다.' }, { status: 500 });
  }
}