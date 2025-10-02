import { useQuery } from '@tanstack/react-query';
import { getMenus } from '@/features/menus/api/menus.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuStatus } from '@prisma/client';
import { Menus } from '@/types/types';

export const useGetMenus = () => {
  return useQuery({
    queryKey: ['menus'],
    queryFn: getMenus,
  });
};

const deleteMenu = async (id: string) => {
  const response = await fetch(`/api/menus/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete menu');
  }

  return response.json();
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
};

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
