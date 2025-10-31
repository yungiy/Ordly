import { getReservationsByDate } from '@/features/reservations/api/reservations.api';
import { Reservation } from '@prisma/client';
import { useApiQuery } from './useApiQuery';

export const useReservations = (date: string) => {
  const isServer = typeof window === 'undefined';

  return useApiQuery<
    { data: Reservation[] }, 
    Error,
    Reservation[]
  >(
    ['reservations', date],
    () => getReservationsByDate(date),
    {
      select: (response) => response.data,
      enabled: !isServer && !!date,
    }
  );
};
