import { useQuery } from '@tanstack/react-query';
import { getReservationsByDate } from '@/features/reservations/api/reservations.api';

export const useReservations = (date: string) => {
  const isServer = typeof window === 'undefined';

  return useQuery({
    queryKey: ['reservations', date],
    queryFn: () => getReservationsByDate(date),
    // 서버에서는 쿼리를 비활성화하고, 클라이언트에서만 날짜가 있을 때 실행
    enabled: !isServer && !!date,
  });
};
