import { Clock, Phone, Users } from 'lucide-react';
import { Reservation, ReservationStatus } from '@/types/types';
import { twMerge } from 'tailwind-merge';

const statusStyles: { [key in ReservationStatus]: string } = {
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels: { [key in ReservationStatus]: string } = {
  confirmed: '확정',
  completed: '방문완료',
  cancelled: '취소',
};

type Props = {
  reservation: Reservation;
};

export default function ReservationItem({ reservation }: Props) {
  return (
    <li className='flex flex-col gap-2 py-2 border-gray-200 hover:bg-gray-100/50 transition-colors duration-150'>
      <div className='flex justify-between items-center'>
        <p className='font-bold text-gray-800'>{reservation.name} 님</p>
        <span
          className={twMerge(
            'px-2.5 py-0.5 rounded-full text-xs font-semibold',
            statusStyles[reservation.status]
          )}
        >
          {statusLabels[reservation.status]}
        </span>
      </div>
      <div className='flex items-center gap-3 text-sm text-gray-600'>
        <div className='flex items-center gap-1.5'>
          <Clock size={14} className='text-gray-400' />
          <span>{reservation.time}</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <Users size={14} className='text-gray-400' />
          <span>{reservation.partySize}명</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <Phone size={14} className='text-gray-400' />
          <span>{reservation.phone}</span>
        </div>
      </div>
    </li>
  );
}
