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
        Coupon: true,
        Order: {
          include: {
            OrderItem: true,
          },
        },
      },
    });

    if (!store) {
      return NextResponse.json({ message: '가게 정보를 찾을 수 없습니다.' }, { status: 404 });
    }

    // Decimal 타입을 문자열로 변환하여 직렬화 오류 방지
    const serializedStore = {
      ...store,
      Category: store.Category.map((category) => ({
        ...category,
        MenuItem: category.MenuItem.map((item) => ({ ...item, price: item.price.toString() })),
      })),
      Coupon: store.Coupon.map((c) => ({ ...c, discountValue: c.discountValue.toString() })),
      Order: store.Order.map((o) => ({
        ...o,
        totalPrice: o.totalPrice.toString(),
        OrderItem: o.OrderItem.map((oi) => ({ ...oi, priceAtOrder: oi.priceAtOrder.toString() })),
      })),
    };

    return NextResponse.json(serializedStore);
  } catch (error) {
    console.error('가게 정보를 가져오는 중 오류 발생:', error);
    return NextResponse.json({ message: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}