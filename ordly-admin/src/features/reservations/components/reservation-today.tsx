'use client';

import { useState, useEffect } from 'react';
import CardItem from '@/components/common/card-item';
import ReservationItem from './reservation-item';
import { Reservation as PrismaReservation } from '@prisma/client';
import ReservationSkeleton from '@/components/skeleton/reservation-skeleton';
import { transformReservation } from './reservation-list';

type Props = {
  reservations: PrismaReservation[] | undefined;
  isLoading: boolean;
};

export default function ReservationToday({ reservations, isLoading }: Props) {
  const [isClient, setIsClient] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const title = `${today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })} 예약`;

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
    transformReservation(res, i, false)
  );

  const scheduled = transformedReservations.filter(
    (r) => r.status === 'confirmed'
  );
  const cancelled = transformedReservations.filter(
    (r) => r.status === 'cancelled'
  );

  return (
    <CardItem
      title={title}
      className='flex flex-col flex-grow overflow-hidden p-4'
    >
      <div className='flex-grow overflow-y-auto space-y-2'>
        {scheduled.length > 0 && (
          <ul className='rounded-lg'>
            {scheduled.map((res) => (
              <ReservationItem key={res.id} reservation={res} />
            ))}
          </ul>
        )}

        {cancelled.length > 0 && (
          <ul className='rounded-lg'>
            {cancelled.map((res) => (
              <ReservationItem key={res.id} reservation={res} />
            ))}
          </ul>
        )}
      </div>
    </CardItem>
  );
}
