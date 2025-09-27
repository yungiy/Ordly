'use client';

import { useState, useEffect } from 'react';
import CardItem from '@/components/common/card-item';
import ReservationItem from './reservation-item';
import {
  Reservation as PrismaReservation,
  ReservationStatus as PrismaReservationStatus,
} from '@prisma/client';
import {
  Reservation as FrontendReservation,
  ReservationStatus as FrontendReservationStatus,
} from '@/types/types';
import ReservationSkeleton from '@/components/common/reservation-skeleton';

type Props = {
  reservations: PrismaReservation[] | undefined;
  isLoading: boolean;
  selectedDate: Date | null;
};

// Prisma Reservation 타입을 Frontend Reservation 타입으로 변환하는 함수
const transformReservation = (
  res: PrismaReservation,
  index: number,
  isPast: boolean
): FrontendReservation => {
  let status: FrontendReservationStatus;

  if (isPast) {
    status = res.status === 'CONFIRMED' ? 'completed' : 'cancelled';
  } else {
    if (res.status === 'REQUESTED' || res.status === 'CONFIRMED') {
      status = 'confirmed';
    } else {
      status = 'cancelled';
    }
  }

  return {
    id: index, // types.ts의 id가 number이므로 index 사용
    time: new Date(res.reservationTime).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    name: res.customerName,
    partySize: res.numberOfGuests,
    phone: res.customerPhone,
    status: status,
  };
};

export default function ReservationList({
  reservations,
  isLoading,
  selectedDate,
}: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <ReservationSkeleton />;
  }

  if (!selectedDate) {
    return (
      <CardItem title='예약 정보'>
        <div className='flex items-center justify-center h-full text-gray-500'>
          캘린더에서 날짜를 선택해주세요.
        </div>
      </CardItem>
    );
  }

  if (isLoading) {
    return <ReservationSkeleton />;
  }

  if (!reservations || reservations.length === 0) {
    return (
      <CardItem title='예약 정보'>
        <div className='flex items-center justify-center h-full text-gray-500'>
          해당 날짜에 예약이 없습니다.
        </div>
      </CardItem>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPastDate = selectedDate < today;

  const transformedReservations = reservations.map((res, i) =>
    transformReservation(res, i, isPastDate)
  );

  const scheduled = transformedReservations.filter(
    (r) => r.status === 'confirmed'
  );
  const completed = transformedReservations.filter(
    (r) => r.status === 'completed'
  );
  const cancelled = transformedReservations.filter(
    (r) => r.status === 'cancelled'
  );

  return (
    <CardItem title='예약 목록' className='flex-grow overflow-y-auto'>
      <div className='space-y-4'>
        {isPastDate
          ? // 과거: 방문 완료 목록
            completed.length > 0 && (
              <div className='flex flex-col gap-2'>
                {completed.map((res) => (
                  <ReservationItem key={res.id} reservation={res} />
                ))}
              </div>
            )
          : // 오늘 또는 미래: 예정 목록
            scheduled.length > 0 && (
              <div className='flex flex-col gap-2'>
                {scheduled.map((res) => (
                  <ReservationItem key={res.id} reservation={res} />
                ))}
              </div>
            )}

        {/* 취소 목록 */}
        {cancelled.length > 0 && (
          <div className='flex flex-col gap-2'>
            {cancelled.map((res) => (
              <ReservationItem key={res.id} reservation={res} />
            ))}
          </div>
        )}
      </div>
    </CardItem>
  );
}
