import { NextResponse } from 'next/server';
import { ReservationStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
  request: Request,
  { params }: { params: { date: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.storeId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const storeId = session.user.storeId;

    const { date } = params;
    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    const [year, month, day] = date.split('-').map(Number);
    const selectedDate = new Date(Date.UTC(year, month - 1, day));

    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    const startOfDay = selectedDate;
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    let statusFilter: ReservationStatus[];

    if (selectedDate < today) {
      // 과거: 방문(CONFIRMED), 취소(CANCELED)
      statusFilter = [ReservationStatus.CONFIRMED, ReservationStatus.CANCELED];
    } else {
      // 오늘 또는 미래: 예정(CONFIRMED, REQUESTED), 취소(CANCELED)
      statusFilter = [
        ReservationStatus.CONFIRMED,
        ReservationStatus.REQUESTED,
        ReservationStatus.CANCELED,
      ];
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        storeId,
        reservationTime: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          in: statusFilter,
        },
      },
      orderBy: {
        reservationTime: 'asc',
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}