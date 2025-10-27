import { MenuStatus } from '@prisma/client';
import { Menus } from '@/types/types';
import { MenuItem } from '@prisma/client';

export const getMenus = async (): Promise<Menus[]> => {
  const response = await fetch('/api/menus');
  if (!response.ok) {
    throw new Error('메뉴를 불러오는데 실패했습니다.');
  }
  return response.json();
};

export const createMenu = async (formData: FormData): Promise<MenuItem> => {
  const response = await fetch('/api/menus', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('메뉴를 생성하는데 실패했습니다.');
  }

  return response.json();
};

export const updateMenu = async ({ id, formData }: { id: string, formData: FormData }): Promise<MenuItem> => {
  const response = await fetch(`/api/menus/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error updating menu:', errorData);
    throw new Error('메뉴를 수정하는데 실패했습니다.');
  }

  return response.json();
};

export const deleteMenu = async (id: string) => {
  const response = await fetch(`/api/menus/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete menu');
  }

  return response.json();
};

export const updateMenuStatus = async ({
  id,
  status,
}: {
  id: string;
  status: MenuStatus;
}) => {
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
