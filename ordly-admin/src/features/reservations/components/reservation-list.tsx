// src/components/reservations/ReservationList.tsx
import CardItem from '@/components/common/card-item';
import ReservationItem from './reservation-item';
import { Reservation } from '@/types/types';

const sampleReservations: Reservation[] = [
  {
    id: 1,
    time: '14:00',
    name: '김OO',
    partySize: 4,
    phone: '010-1234-5678',
    request: '창가 자리 부탁드립니다.',
    status: 'confirmed',
  },
  {
    id: 2,
    time: '18:30',
    name: '박XX',
    partySize: 2,
    phone: '010-8765-4321',
    status: 'confirmed',
  },
  {
    id: 3,
    time: '19:00',
    name: '이XX',
    partySize: 5,
    phone: '010-1111-2222',
    status: 'completed',
  },
];

type Props = {
  title: string;
};

export default function ReservationList({ title}: Props) {
  return (
    <CardItem title={title}>
      <ul className='space-y-3 flex-grow overflow-y-auto'>
        {sampleReservations.map((res) => (
          <ReservationItem key={res.id} reservation={res} />
        ))}
      </ul>
    </CardItem>
  );
}
