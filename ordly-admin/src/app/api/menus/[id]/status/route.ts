import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { MenuStatus } from '@prisma/client';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const { status } = (await req.json()) as { status: MenuStatus };

  if (!status || !['AVAILABLE', 'SOLDOUT'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status provided' }, { status: 400 });
  }

  try {
    const menuItem = await prisma.menuItem.findFirst({
        where: {
            id: id,
            category: {
                storeId: session.user.storeId
            }
        }
    });

    if (!menuItem) {
        return NextResponse.json({ error: 'Menu item not found or access denied' }, { status: 404 });
    }

    const updatedMenuItem = await prisma.menuItem.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedMenuItem);
  } catch (error) {
    console.error('Error updating menu status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
