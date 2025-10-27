import { useQuery } from '@tanstack/react-query';
import {
  getMenus,
  deleteMenu,
  updateMenuStatus,
  createMenu,
  updateMenu,
} from '@/features/menus/api/menus.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuItem, MenuStatus } from '@prisma/client';
import { Menus } from '@/types/types';

export const useGetMenus = () => {
  return useQuery({
    queryKey: ['menus'],
    queryFn: getMenus,
  });
};

export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation<MenuItem, Error, FormData>({
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
}

type UpdateMenuPayload = {
  id: string;
  formData: FormData;
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation<MenuItem, Error, UpdateMenuPayload>({
    mutationFn: updateMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
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

export const useUpdateMenuStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Menus, Error, UpdateStatusPayload>({
    mutationFn: updateMenuStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
};
