import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MenuStatus } from '@prisma/client';

interface Params {
  params: { id: string };
}

// PATCH - 메뉴 상태 토글 (AVAILABLE <-> SOLDOUT)
export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params;

    const menuItem = await prisma.menuItem.findUnique({
      where: { menu_item_id: id },
    });

    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    const newStatus = menuItem.status === MenuStatus.AVAILABLE ? MenuStatus.SOLDOUT : MenuStatus.AVAILABLE;

    const updatedMenuItem = await prisma.menuItem.update({
      where: { menu_item_id: id },
      data: {
        status: newStatus,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(updatedMenuItem);
  } catch (error) {
    console.error(`Error toggling menu item status for ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to toggle menu item status' }, { status: 500 });
  }
}
