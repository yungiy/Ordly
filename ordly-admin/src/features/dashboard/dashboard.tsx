'use client';

import Graph from '../statistics/components/graph';
import ReservationToday from '../reservations/components/reservation-today';
import { useReservations } from '@/hooks/useReservations.hooks';
import { formatDateToYYYYMMDD } from '@/utils/date';

export default function Dashboard() {
  const today = new Date();
  const formattedDate = formatDateToYYYYMMDD(today);
  const { data: reservations, isLoading } = useReservations(formattedDate);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 h-full gap-4 p-4 sm:p-2 lg:p-4'>
      <div className='md:col-span-2'>
        <Graph />
      </div>
      <div className='md:col-span-1'>
        <ReservationToday reservations={reservations} isLoading={isLoading} />
      </div>
    </div>
  );
}
