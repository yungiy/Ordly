import { NextResponse } from 'next/server';
import { OrderStatus as PrismaOrderStatus } from '@prisma/client';
import { Order } from '@/types/types';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

const reverseStatusMap: Record<Order['status'], PrismaOrderStatus> = {
  준비중: 'PENDING',
  조리중: 'PREPARING',
  완료: 'COMPLETED',
  취소: 'CANCELED',
};

const statusMap: Record<PrismaOrderStatus, Order['status']> = {
  PENDING: '준비중',
  PREPARING: '조리중',
  COMPLETED: '완료',
  CANCELED: '취소',
};

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
    const newStatus: Order['status'] = body.status;

    if (!newStatus || !reverseStatusMap[newStatus]) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const prismaStatus = reverseStatusMap[newStatus];

    const updatedOrderFromDb = await prisma.order.update({
      where: {
        id: orderId,
        storeId: storeId, // 보안: 자신의 가게 주문만 수정 가능하도록 보장
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

    const updatedOrder: Order = {
      id: updatedOrderFromDb.id,
      orderNumber: updatedOrderFromDb.orderNumber ?? '번호 없음',
      totalPrice: updatedOrderFromDb.totalPrice.toString(),
      status: statusMap[updatedOrderFromDb.status],
      createdAt: updatedOrderFromDb.createdAt.toISOString(),
      items: updatedOrderFromDb.orderItems.map((item) => ({
        id: item.id,
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.priceAtOrder.toString(),
      })),
    };

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error(`[PATCH /api/orders/${orderId}] - 주문 상태 업데이트 중 에러 발생:`, error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}