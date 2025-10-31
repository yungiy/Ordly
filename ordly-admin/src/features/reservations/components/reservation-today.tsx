'use client';

import { useState, useEffect } from 'react';
import CardItem from '@/components/common/card-item';
import ReservationItem from './reservation-item';
import { Reservation as PrismaReservation } from '@prisma/client';
import {
  Reservation as FrontendReservation,
  ReservationStatus as FrontendReservationStatus,
} from '@/types/types';
import ReservationSkeleton from '@/components/skeleton/reservation-skeleton';
import { useReservations } from '@/hooks/useReservations.hooks';

const transformReservation = (res: PrismaReservation): FrontendReservation => {
  let status: FrontendReservationStatus;

  status =
    res.status === 'CONFIRMED' || res.status === 'REQUESTED'
      ? 'confirmed'
      : 'cancelled';

  return {
    id: res.id,
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

export default function ReservationToday() {
  const [isClient, setIsClient] = useState(false);
  const [today] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const formattedDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const title = `${formattedDate}의 예약`;

  const { data: reservations, isLoading } = useReservations(
    today.toISOString().split('T')[0]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <ReservationSkeleton />;
  }

  if (isLoading) {
    return <ReservationSkeleton />;
  }

  if (!reservations || reservations.length === 0) {
    return (
      <CardItem title={title}>
        <div className='flex items-center justify-center h-full text-gray-500'>
          오늘의 예약이 없습니다.
        </div>
      </CardItem>
    );
  }

  const transformedReservations = reservations.map((res, i) =>
    transformReservation(res)
  );

  const scheduled = transformedReservations.filter(
    (r) => r.status === 'confirmed'
  );
  const cancelled = transformedReservations.filter(
    (r) => r.status === 'cancelled'
  );

  return (
    <CardItem title={title} className='flex flex-col flex-grow overflow-hidden'>
      <ul className='flex-grow overflow-y-auto space-y-2'>
        {scheduled.length > 0 && (
          <li>
            <h3 className='font-semibold text-gray-900 py-2'>
              예정된 예약 ({scheduled.length})
            </h3>
            {scheduled.map((res) => (
              <ReservationItem key={res.id} reservation={res} />
            ))}
          </li>
        )}

        {cancelled.length > 0 && (
          <li>
            <h3 className='font-semibold text-gray-900 py-2 mt-2'>
              취소된 예약 ({cancelled.length})
            </h3>
            {cancelled.map((res) => (
              <ReservationItem key={res.id} reservation={res} />
            ))}
          </li>
        )}
      </ul>
    </CardItem>
  );
}
