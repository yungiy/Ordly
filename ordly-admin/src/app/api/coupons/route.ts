import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import crypto from 'crypto';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const storeId = session.user.storeId as string;
    const coupons = await prisma.coupon.findMany({
      where: { storeId: storeId },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const storeId = session?.user?.storeId;
  if (!storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      description,
      discountType,
      discountValue,
      validFrom,
      validUntil,
    } = body;

    const code = `COUPON${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    const newCoupon = await prisma.coupon.create({
      data: {
        title,
        code,
        description,
        discountType,
        discountValue,
        validFrom: new Date(validFrom),
        validUntil: new Date(validUntil),
        storeId: storeId,
      },
    });
    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    console.error('Failed to create coupon:', error);
    return NextResponse.json(
      { error: 'Failed to create coupon' },
      { status: 500 }
    );
  }
}
