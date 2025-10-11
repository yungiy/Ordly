import { NextResponse } from 'next/server';
import { fetchMenuDetail } from '@/features/menu-detail/menu-detail.api';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ message: '메뉴 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const menuItem = await fetchMenuDetail(id);

    if (!menuItem) {
      return NextResponse.json({ message: '메뉴를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(menuItem);
  } catch (error) {
    console.error(`메뉴 상세 정보를 가져오는 중 오류 발생 (ID: ${id}):`, error);
    return NextResponse.json({ message: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}