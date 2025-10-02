import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuStatus } from '@prisma/client';
import { Menus } from '@/types/types';

type UpdateStatusPayload = {
  id: string;
  status: MenuStatus;
};

const updateMenuStatus = async ({ id, status }: UpdateStatusPayload) => {
  const response = await fetch(`/api/menus/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update menu status');
  }

  return response.json();
};

export const useUpdateMenuStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Menus, Error, UpdateStatusPayload>({
    mutationFn: updateMenuStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
};
