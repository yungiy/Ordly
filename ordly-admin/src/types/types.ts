// 회원가입 요청 시 사용되는 타입
export type RegisterRequest = {
  name: string;
  phone: string;
  password: string;
};

// 로그인 요청 시 사용되는 타입
export type LoginRequest = {
  name: string;
  password: string;
};

export type Order = {
  id: number;
  tableNumber: number;
  orderNumber: number;
  totalPrice: string;
  status: 'pending' | 'cooking' | 'done' | 'cencel';
  items: OrderItemDetail[];
  createdAt: string;
};

export type CouponStatus = '활성' | '기간 만료';
export type CouponType = '정률' | '정액';

export type Coupons = {
  id: number;
  name: string;
  type: CouponType;
  status: CouponStatus;
  usedCount: number;
};

export type OrderItemDetail = {
  id: number;
  name: string;
  quantity: number;
  price: string;
};

export type ReservationStatus = 'confirmed' | 'completed' | 'cancelled';

export type Reservation = {
  id: number;
  time: string;
  name: string;
  partySize: number;
  phone: string;
  request?: string;
  status: ReservationStatus;
};

export type Menus = {
  id: number;
  category: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean; // 판매 상태
};
