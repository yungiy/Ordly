import { CheckCircle, Phone, XCircle } from 'lucide-react';
import { Reservation, ReservationStatus } from '@/types/types';

const statusStyles: { [key in ReservationStatus]: string } = {
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

interface Props {
  reservation: Reservation;
}

export default function ReservationItem({ reservation }: Props) {
  return (
    <li className='p-1 flex flex-col gap-2'>
      <div className='flex justify-between'>
        <div>
          <p className='font-bold text-lg text-gray-900'>
            {reservation.time} - {reservation.name} 님 ({reservation.partySize}
            명)
          </p>
          <div className='flex items-center gap-2 mt-1 text-sm text-gray-600'>
            <Phone size={14} />
            <span>{reservation.phone}</span>
          </div>
        </div>
        <span
          className={`inline-flex items-center text-xs font-semibold px-2 rounded-full ${
            statusStyles[reservation.status]
          }`}
        >
          {reservation.status === 'confirmed' && '예정'}
          {reservation.status === 'completed' && '완료'}
          {reservation.status === 'cancelled' && '취소'}
        </span>
      </div>
    </li>
  );
}
