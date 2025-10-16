'use client';

import { useToastStore } from '@/store/toast.store';
import CouponItem, { Coupon } from '@/features/coupon/coupon-item';

type Props = {
  coupons: Coupon[];
}

export default function CouponPage({ coupons }: Props) {
  const { showToast } = useToastStore();

  const handleDownload = (title: string) => {
    showToast(`${title} 쿠폰이 다운로드 되었습니다.`);
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-bold'>사용 가능한 쿠폰 {coupons.length}장</h2>
      {coupons.map((coupon) => (
        <CouponItem key={coupon.id} coupon={coupon} onDownload={handleDownload} />
      ))}
    </div>
  );
}
