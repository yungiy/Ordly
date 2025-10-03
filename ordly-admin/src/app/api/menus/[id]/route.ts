import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Menu ID is missing' }, { status: 400 });
  }

  try {
    const existingMenu = await prisma.menuItem.findFirst({
      where: {
        id: id,
        category: {
          storeId: session.user.storeId,
        },
      },
    });

    if (!existingMenu) {
      return NextResponse.json({ error: 'Menu not found or access denied' }, { status: 404 });
    }

    const data = await req.formData();
    const name = data.get('name') as string;
    const price = data.get('price') as string;
    const categoryId = data.get('categoryId') as string;
    const description = data.get('description') as string | null;
    const file = data.get('image') as File | null;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updateData: Prisma.MenuItemUpdateInput = {
      name,
      price: parseFloat(price),
      description,
      category: {
        connect: { id: categoryId },
      },
    };

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const path = join(process.cwd(), 'public', 'uploads', 'menus', filename);
      await writeFile(path, buffer);
      (updateData as any).imageBase64 = `/uploads/menus/${filename}`;
      // TODO: Optionally delete the old image
    }

    const updatedMenu = await prisma.menuItem.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    return NextResponse.json(updatedMenu);
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Menu ID is missing' }, { status: 400 });
  }

  try {
    const menuItem = await prisma.menuItem.findFirst({
      where: {
        id: id,
        category: {
          storeId: session.user.storeId,
        },
      },
    });

    if (!menuItem) {
      return NextResponse.json({ error: 'Menu not found or access denied' }, { status: 404 });
    }
    
    if (menuItem.imageBase64) {
      const imagePath = join(process.cwd(), 'public', menuItem.imageBase64);
      try {
        await unlink(imagePath);
      } catch (fileError) {
        console.error('Failed to delete image file:', fileError);

      }
    }

    await prisma.$transaction([
      prisma.orderItem.deleteMany({ where: { menuItemId: id } }),
      prisma.menuItem.delete({ where: { id } })
    ]);

    return NextResponse.json({ message: 'Menu deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}