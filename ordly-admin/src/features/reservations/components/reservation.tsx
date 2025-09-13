import { Reservation } from '@/types/types';
import ReservationList from './reservation-list';
import ReservationCalendar from './reservations-calendar';


export default function ReservationPage() {
  return (
    <div className='flex-1 grid grid-cols-1 md:grid-cols-3 flex-grow gap-4 p-4 sm:p-2 lg:p-4'>
      
      <div className='md:col-span-2'>
        <ReservationCalendar />
      </div>

      <div className='md:col-span-1 flex flex-col gap-4'>
        <ReservationList title='예정' />
        <ReservationList title='취소' />
        <ReservationList title='방문 완료'/>
      </div>
    </div>
  );
}