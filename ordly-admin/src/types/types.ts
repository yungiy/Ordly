export interface Order {
  id: number;
  orderNumber: string;
  status: 'pending' | 'cooking' | 'done';
  items: { name: string }[]; 
}