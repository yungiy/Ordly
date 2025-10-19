import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import cuid from 'cuid';

interface CartItemInput {
  menuItemId: string;
  quantity: number;
  priceAtOrder: number;
}

export async function POST(req: NextRequest) {
  const { items, storeId }: { items: CartItemInput[]; storeId: string } = await req.json();

  if (!items || items.length === 0 || !storeId) {
    return NextResponse.json({ message: '잘못된 요청입니다.' }, { status: 400 });
  }

  try {
    const calculatedTotalPrice = items.reduce((sum, item) => {
      const price = typeof item.priceAtOrder === 'string' ? parseFloat(item.priceAtOrder) : item.priceAtOrder;
      return new Decimal(sum).plus(new Decimal(price).times(item.quantity));
    }, new Decimal(0));

    const orderNumber = `ord_${new Date().getTime()}`;

    const newOrder = await prisma.order.create({
      data: {
        id: cuid(),
        orderNumber: orderNumber,
        status: 'PENDING',
        totalPrice: calculatedTotalPrice,
        updatedAt: new Date(),
        storeId: storeId,
        OrderItem: {
          create: items.map(item => ({
            id: cuid(),
            quantity: item.quantity,
            priceAtOrder: new Decimal(typeof item.priceAtOrder === 'string' ? parseFloat(item.priceAtOrder) : item.priceAtOrder),
            MenuItem: {
              connect: { id: item.menuItemId },
            },
          })),
        },
      },
      include: {
        OrderItem: true,
      },
    });

    const responsePayload = {
      merchant_uid: newOrder.orderNumber,
      orderId: newOrder.id,
      amount: newOrder.totalPrice,
    };

    return NextResponse.json(responsePayload);

  } catch (error) {
    return NextResponse.json({ message: '주문 생성 중 서버 오류 발생' }, { status: 500 });
  }
}