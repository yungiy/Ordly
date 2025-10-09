import { Order } from '@/types/types';

export const getOrders = async (): Promise<Order[]> => {
  const response = await fetch('/api/orders');
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json() as Promise<Order[]>;
};

type UpdateOrderStatusPayload = {
  id: string;
  status: Order['status'];
};

export const updateOrderStatus = async (
  payload: UpdateOrderStatusPayload
): Promise<Order> => {
  const { id, status } = payload;
  const response = await fetch(`/api/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update order status');
  }
  return response.json() as Promise<Order>;
};
