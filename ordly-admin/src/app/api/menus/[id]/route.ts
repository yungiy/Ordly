import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: { id: string };
}

// GET - 단일 메뉴 조회
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const menuItem = await prisma.menuItem.findUnique({
      where: { menu_item_id: id },
    });

    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json(menuItem);
  } catch (error) {
    console.error(`Error fetching menu item ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch menu item' }, { status: 500 });
  }
}


// PUT - 메뉴 정보 업데이트
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, price, description, imageUrl, category_id } = body;

    if (!name || !price || !category_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedMenuItem = await prisma.menuItem.update({
      where: { menu_item_id: id },
      data: {
        name,
        price: Number(price),
        description,
        imageUrl,
        category_id,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(updatedMenuItem);
  } catch (error) {
    console.error(`Error updating menu item ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
  }
}

// DELETE - 메뉴 삭제
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;

    await prisma.menuItem.delete({
      where: { menu_item_id: id },
    });

    return NextResponse.json({ message: 'Menu item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting menu item ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}
