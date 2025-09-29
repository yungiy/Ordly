'use client';

import { useCalendar } from '@/hooks/useCalendar.hooks';
import ReservationList from './reservation-list';
import { useReservations } from '@/hooks/useReservations.hooks';
import { formatDateToYYYYMMDD } from '@/utils/date';
import ReservationsCalendar from './reservations-calendar';

export default function Reservation() {
  const { selectedDate, handleSelectDate } = useCalendar();
  const formattedDate = selectedDate ? formatDateToYYYYMMDD(selectedDate) : '';

  const { data: reservations, isLoading } = useReservations(formattedDate);

  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-3 flex-grow gap-4 p-4 sm:p-2 lg:p-4'>
      <div className='md:col-span-2 flex flex-col'>
        <ReservationsCalendar
          onDateClick={handleSelectDate}
          selectedDate={selectedDate}
        />
      </div>

      <div className='md:col-span-1 flex flex-col gap-4'>
        <ReservationList
          reservations={reservations}
          isLoading={isLoading}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}
