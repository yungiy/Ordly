import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { supabase } from '@/lib/supabase';
import { authOptions } from '@/lib/auth';

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
      return NextResponse.json(
        { error: 'Menu not found or access denied' },
        { status: 404 }
      );
    }

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

    const updateData: Prisma.MenuItemUpdateInput = {
      name,
      price: parseFloat(price),
      description,
      category: {
        connect: { id: categoryId },
      },
    };

    if (file) {
      // 새 이미지 업로드
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = `${crypto.randomUUID()}-${Date.now()}.${fileExtension}`;
      const newFilePath = `${session.user.storeId}/${uniqueFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('ordly-menu-images')
        .upload(newFilePath, file);

      if (uploadError) {
        console.error('Error uploading new image to Supabase:', uploadError);
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('ordly-menu-images')
        .getPublicUrl(newFilePath);

      updateData.imageUrl = urlData.publicUrl;

      if (existingMenu.imageUrl) {
        try {
          const bucketName = 'ordly-menu-images';
          const pathParts = existingMenu.imageUrl.split(`/${bucketName}/`);
          if (pathParts.length > 1) {
            const oldFilePath = pathParts[1];
            await supabase.storage.from(bucketName).remove([oldFilePath]);
          }
        } catch (removeError) {
          console.error(
            'Failed to delete old image from Supabase:',
            removeError
          );
        }
      }
    }

    const updatedMenu = await prisma.menuItem.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    const serializedMenu = {
      ...updatedMenu,
      price: updatedMenu.price.toNumber(),
    };
    return NextResponse.json(serializedMenu);
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
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
      return NextResponse.json(
        { error: 'Menu not found or access denied' },
        { status: 404 }
      );
    }

    // Supabase Storage에서 이미지 삭제
    if (menuItem.imageUrl) {
      try {
        const bucketName = 'ordly-menu-images';
        const pathParts = menuItem.imageUrl.split(`/${bucketName}/`);
        if (pathParts.length > 1) {
          const filePath = pathParts[1];
          await supabase.storage.from(bucketName).remove([filePath]);
        }
      } catch (removeError) {
        console.error('Failed to delete image from Supabase:', removeError);
      }
    }

    await prisma.$transaction([
      prisma.orderItem.deleteMany({ where: { menuItemId: id } }),
      prisma.menuItem.delete({ where: { id } }),
    ]);

    return NextResponse.json(
      { message: 'Menu deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
