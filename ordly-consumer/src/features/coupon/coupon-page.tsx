'use client';

import { useToastStore } from '@/store/toast.store';
import CouponItem, { Coupon } from '@/features/coupon/coupon-item';
import { useCouponStore } from '@/store/coupon.store';
import { useEffect, useState } from 'react';

type Props = {
  coupons: Coupon[];
};

export default function CouponPage({ coupons }: Props) {
  const { showToast } = useToastStore();
  const { addCoupon, isCouponDownloaded } = useCouponStore();
  const [isMounted, setIsMounted] = useState(false);

  const handleDownload = (coupon: Coupon) => {
    if (isCouponDownloaded(coupon.id)) {
      showToast('이미 다운로드한 쿠폰입니다.');
      return;
    }
    addCoupon(coupon);
    showToast(`${coupon.title} 쿠폰이 다운로드 되었습니다.`);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const availableCoupons = isMounted
    ? coupons.filter((coupon) => !isCouponDownloaded(coupon.id))
    : [];

  if (!isMounted) {
    return null; // 또는 로딩 스피너를 보여줄 수 있습니다.
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-lg font-bold'>
        사용 가능한 쿠폰 {availableCoupons.length}장
      </h2>
      {availableCoupons.map((coupon) => (
        <CouponItem
          key={coupon.id}
          coupon={coupon}
          onDownload={handleDownload}
        />
      ))}
    </div>
  );
}
