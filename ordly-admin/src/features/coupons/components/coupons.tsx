import type { Coupons } from '@/types/types';
import CouponStats from './coupons-stats';
import CouponTable from './coupons-tables';

const sampleCoupons: Coupons[] = [
  {
    id: 1,
    name: '신규 고객 10% 할인',
    type: '정률',
    status: '활성',
    usedCount: 152,
  },
  {
    id: 2,
    name: '배달비 무료 쿠폰',
    type: '정액',
    status: '활성',
    usedCount: 89,
  },
  {
    id: 3,
    name: '오픈 기념 1,000원 할인',
    type: '정액',
    status: '기간 만료',
    usedCount: 250,
  },
];

export default function Coupons() {
  return (
    <div className='flex flex-col flex-1 gap-4 p-4 sm:p-2 lg:p-4'>
      <CouponStats />
      <CouponTable coupons={sampleCoupons} />
    </div>
  );
}
