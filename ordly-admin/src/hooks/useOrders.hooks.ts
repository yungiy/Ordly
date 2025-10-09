import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query';
import { getOrders, updateOrderStatus } from '@/features/orders/api/orders.api';
import { Order } from '@/types/types';

type UpdateOrderStatusPayload = {
  id: string;
  status: Order['status'];
};

export const useGetOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Order,
    Error,
    UpdateOrderStatusPayload,
    { previousOrders: Order[] | undefined }
  >({
    mutationFn: updateOrderStatus as MutationFunction<
      Order,
      UpdateOrderStatusPayload
    >,
    onMutate: async (newOrderData) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] });
      const previousOrders = queryClient.getQueryData<Order[]>(['orders']);

      if (previousOrders) {
        queryClient.setQueryData<Order[]>(
          ['orders'],
          previousOrders.map((order) =>
            order.id === newOrderData.id
              ? { ...order, status: newOrderData.status }
              : order
          )
        );
      }

      return { previousOrders };
    },
    onError: (error, variables, context) => {
      console.error(
        `주문 상태 업데이트 실패 (ID: ${variables.id}). 롤백을 시도합니다.`,
        error
      );

      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
