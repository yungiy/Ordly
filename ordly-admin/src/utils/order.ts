import { Order as PrismaOrder, OrderItem as PrismaOrderItem, MenuItem, OrderStatus as PrismaOrderStatus } from '@prisma/client';
import { Order } from '@/types/types';

export const statusMap: Record<PrismaOrderStatus, Order['status']> = {
  PENDING: '준비중',
  PREPARING: '조리중',
  COMPLETED: '완료',
  CANCELED: '취소',
};

export const reverseStatusMap: Record<Order['status'], PrismaOrderStatus> = {
  준비중: 'PENDING',
  조리중: 'PREPARING',
  완료: 'COMPLETED',
  취소: 'CANCELED',
};

type OrderWithItems = PrismaOrder & {
  orderItems: (PrismaOrderItem & {
    menuItem: MenuItem;
  })[];
};


export const transformOrder = (order: OrderWithItems): Order => ({
  id: order.id,
  orderNumber: order.orderNumber ?? '번호 없음',
  totalPrice: order.totalPrice.toString(),
  status: statusMap[order.status],
  createdAt: order.createdAt.toISOString(),
  items: order.orderItems.map((item) => ({
    id: item.id,
    name: item.menuItem.name,
    quantity: item.quantity,
    price: item.priceAtOrder.toString(),
  })),
});