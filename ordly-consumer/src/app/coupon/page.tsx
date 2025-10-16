import Header from '@/components/layout/header';
import CouponPageClient from '@/features/coupon/coupon-page';
import { Coupon } from '@/features/coupon/coupon-item';

const coupons: Coupon[] = [
  {
    id: 1,
    dDay: 'D-4',
    amount: '5,000',
    currency: '원',
    title: '7월 회원혜택가 쿠폰',
    description: '5천원 초과 단일 상품 구매 시 사용 가능, ID당 1회 사용 가능(중복 사용 불가)',
    startDate: '2021.07.01',
    endDate: '2021.07.31',
  },
  {
    id: 2,
    dDay: 'D-4',
    amount: '10,000',
    currency: '원',
    title: '7월 회원혜택가 쿠폰',
    description: '20만원 이상 단일 상품 구매 시 사용 가능, ID당 1회 사용 가능(중복 사용 불가)',
    startDate: '2021.07.01',
    endDate: '2021.07.31',
  },
  {
    id: 3,
    dDay: 'D-5',
    amount: '5',
    currency: '%',
    title: '특가위크 5% 할인 쿠폰',
    description: '특가위크 5% 할인 쿠폰',
    startDate: '2021.07.26',
    endDate: '2021.08.01',
  },
];

export default function Page() {
  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header title='쿠폰' showBackButton />
      <main className='flex-grow p-4'>
        <CouponPageClient coupons={coupons} />
      </main>
    </div>
  );
}
