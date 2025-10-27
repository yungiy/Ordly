import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { supabase } from '@/lib/supabase';

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

      // 기존 이미지가 있으면 Supabase Storage에서 삭제
      if (existingMenu.imageUrl) {
        try {
          const oldImageKey = existingMenu.imageUrl.split('/').pop();
          const oldFilePath = `${session.user.storeId}/${oldImageKey}`;
          await supabase.storage.from('ordly-menu-images').remove([oldFilePath]);
        } catch (removeError) {
          console.error('Failed to delete old image from Supabase:', removeError);
          // 이미지 삭제에 실패해도 메뉴 업데이트는 계속 진행합니다.
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
    
    // Supabase Storage에서 이미지 삭제
    if (menuItem.imageUrl) {
      try {
        const imageKey = menuItem.imageUrl.split('/').pop();
        const filePath = `${session.user.storeId}/${imageKey}`;
        await supabase.storage.from('ordly-menu-images').remove([filePath]);
      } catch (removeError) {
        console.error('Failed to delete image from Supabase:', removeError);
        // 이미지 삭제에 실패해도 DB 삭제는 계속 진행될 수 있습니다.
      }
    }

    // DB에서 메뉴 및 관련 주문 아이템 삭제
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