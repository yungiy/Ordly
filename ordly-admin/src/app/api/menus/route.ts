import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - 모든 메뉴 조회
export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        category: true, // Include related category data
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

// POST - 새 메뉴 추가
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, imageUrl, category_id } = body;

    if (!name || !price || !category_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        price: Number(price),
        description,
        imageUrl,
        category_id,
      },
      include: {
        category: true, // Return the category object along with the new menu item
      },
    });

    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
