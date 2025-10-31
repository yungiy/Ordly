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
    <CardItem title={title} className='flex-grow overflow-y-auto'>
      <div className='space-y-4'>
        {scheduled.map((res) => (
          <ReservationItem key={res.id} reservation={res} />
        ))}

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
