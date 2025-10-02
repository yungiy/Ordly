import { useQuery } from '@tanstack/react-query';
import { getReservationsByDate } from '@/features/reservations/api/reservations.api';

export const useReservations = (date: string) => {
  const isServer = typeof window === 'undefined';

  return useQuery({
    queryKey: ['reservations', date],
    queryFn: () => getReservationsByDate(date),
    enabled: !isServer && !!date,
  });
};
