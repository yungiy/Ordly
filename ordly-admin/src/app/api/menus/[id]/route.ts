import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  try {
    const data = await req.formData();
    const name = data.get('name') as string;
    const price = data.get('price') as string;
    const categoryId = data.get('categoryId') as string;
    const description = data.get('description') as string | null;
    const file = data.get('image') as File | null;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

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

    let imagePath: string | undefined = existingMenu.image || undefined;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const publicDir = join(process.cwd(), 'public', 'uploads', 'menus');
      const filename = `${Date.now()}-${file.name}`;
      const path = join(publicDir, filename);
      
      await writeFile(path, buffer);
      imagePath = `/uploads/menus/${filename}`;

      // TODO: Optionally, delete the old image from the filesystem
    }

    const updatedMenu = await prisma.menuItem.update({
      where: { id },
      data: {
        name,
        price: parseFloat(price),
        description,
        imageUrl: imagePath,
        category: {
          connect: { id: categoryId },
        },
      },

      include: {
        category: true,
      },
    });

    return NextResponse.json(updatedMenu, { status: 200 });
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
