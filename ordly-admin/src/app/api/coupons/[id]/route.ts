import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// Helper function to check ownership
async function verifyCouponOwnership(couponId: string, userId: string): Promise<boolean> {
  const coupon = await prisma.coupon.findUnique({
    where: { id: couponId },
    select: { storeId: true },
  });
  return coupon?.storeId === userId;
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  if (!session || !session.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = context.params.id;
    // @ts-ignore
    const userStoreId = session.user.storeId as string;

    const coupon = await prisma.coupon.findUnique({
      where: { id: id },
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    if (coupon.storeId !== userStoreId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    const { description, discountType, discountValue, validFrom, validUntil, isActive } = body;

    const updatedCoupon = await prisma.coupon.update({
      where: { id: id },
      data: {
        description,
        discountType,
        discountValue,
        validFrom: new Date(validFrom),
        validUntil: new Date(validUntil),
        isActive,
      },
    });

    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.error(`Failed to update coupon ${context.params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update coupon' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  if (!session || !session.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = context.params.id;
    // @ts-ignore
    const userStoreId = session.user.storeId as string;

    const coupon = await prisma.coupon.findUnique({
      where: { id: id },
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    if (coupon.storeId !== userStoreId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.coupon.delete({
      where: { id: id },
    });
    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Failed to delete coupon ${context.params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete coupon' },
      { status: 500 }
    );
  }
}