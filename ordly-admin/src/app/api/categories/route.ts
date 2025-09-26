import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET - 모든 카테고리 조회
 */
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
