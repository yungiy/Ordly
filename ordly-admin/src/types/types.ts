// 회원가입 요청 시 사용되는 타입
export type RegisterRequest = {
  name: string;
  password: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
};

// 로그인 요청 시 사용되는 타입
export type LoginRequest = {
  name: string;
  password: string;
};

export type Order = {
  id: string;
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
  id: string;
  name: string;
  type: CouponType;
  status: CouponStatus;
  usedCount: number;
};

export type OrderItemDetail = {
  id: string;
  name: string;
  quantity: number;
  price: string;
};

export type ReservationStatus = 'confirmed' | 'completed' | 'cancelled';

export type Reservation = {
  id: string;
  time: string;
  name: string;
  partySize: number;
  phone: string;
  request?: string;
  status: ReservationStatus;
};

export type Category = {
  id: string;
  name: string;
};

export type Menus = {
  id: string;
  category: Category;
  name: string;
  description?: string;
  price: number;
  imageBase64?: string;
  status: 'AVAILABLE' | 'SOLDOUT'; 
};

import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string;
      storeId?: string;
      storeName?: string;
    } & DefaultSession['user'];
  }

  interface User {
    storeId?: string;
    storeName?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id?: string;
    storeId?: string;
    storeName?: string;
  }
}