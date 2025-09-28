import { Reservation } from '@prisma/client';

export const getReservationsByDate = async (date: string): Promise<Reservation[]> => {
  const response = await fetch(`/api/reservations/${date}`);

  if (!response.ok) {
    throw new Error('Failed to fetch reservations');
  }

  return response.json();
};
