import { Phone } from 'lucide-react';
import { Reservation, ReservationStatus } from '@/types/types';

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
    <li className='flex flex-col gap-1'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-bold text-gray-900'>
            {reservation.time} - {reservation.name} 님 ({reservation.partySize}명)
          </p>
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <Phone size={12} />
            <span>{reservation.phone}</span>
          </div>
        </div>
        <span
          className={`flex my-2 px-3 py-1 items-center rounded-full text-xs font-semibold ${
            statusStyles[reservation.status]
          }`}
        >
          {statusLabels[reservation.status]}
        </span>
      </div>
    </li>
  );
}
