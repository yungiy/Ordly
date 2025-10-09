import { NextResponse } from 'next/server';
import { OrderStatus as PrismaOrderStatus } from '@prisma/client';
import { Order } from '@/types/types';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const statusMap: Record<PrismaOrderStatus, Order['status']> = {
  PENDING: '준비중',
  PREPARING: '조리중',
  COMPLETED: '완료',
  CANCELED: '취소',
};

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

    const orders: Order[] = ordersFromDb.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber ?? '번호 없음',
      totalPrice: order.totalPrice.toString(),
      status: statusMap[order.status],
      createdAt: order.createdAt.toISOString(),
      items: order.orderItems.map((item) => ({
        id: item.id,
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.priceAtOrder.toString(),
      })),
    }));

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}