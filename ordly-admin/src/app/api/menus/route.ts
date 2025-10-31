import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { supabase } from '@/lib/supabase';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const storeId = session.user.storeId as string;
    const menus = await prisma.menuItem.findMany({
      where: {
        category: {
          storeId: storeId,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    const serializedMenus = menus.map((menu) => ({
      ...menu,
      price: menu.price.toNumber(),
    }));
    return NextResponse.json(serializedMenus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menus' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.storeId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.formData();
    const name = data.get('name') as string;
    const price = data.get('price') as string;
    const categoryId = data.get('categoryId') as string;
    const description = data.get('description') as string | null;
    const file = data.get('image') as File | null;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const createData: Prisma.MenuItemCreateInput = {
      name,
      price: parseFloat(price),
      description,
      status: 'AVAILABLE',
      category: {
        connect: { id: categoryId },
      },
    };

    if (file) {
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = `${crypto.randomUUID()}-${Date.now()}.${fileExtension}`;
      const filePath = `${session.user.storeId}/${uniqueFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('ordly-menu-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading to Supabase:', uploadError);
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('ordly-menu-images')
        .getPublicUrl(filePath);

      if (urlData) {
        createData.imageUrl = urlData.publicUrl;
      }
    }

    const newMenu = await prisma.menuItem.create({
      data: createData,
      include: {
        category: true,
      },
    });

    return NextResponse.json(newMenu, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
