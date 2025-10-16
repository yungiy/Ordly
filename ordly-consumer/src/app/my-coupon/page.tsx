'use client';

import React from 'react';
import Header from '@/components/layout/header';
import { useCouponStore } from '@/store/coupon.store';
import CouponItem from '@/features/coupon/coupon-item';

export default function MyCouponsPage() {
  const { downloadedCoupons } = useCouponStore();

  return (
    <div className='flex flex-col h-full bg-gray-50'>
      <Header title='내 쿠폰' showBackButton />
      <main className='flex-grow p-4'>
        <div className='space-y-4'>
          <h2 className='text-lg font-bold'>
            보유한 쿠폰 {downloadedCoupons.length}장
          </h2>
          {downloadedCoupons.length > 0 ? (
            downloadedCoupons.map((coupon) => (
              <CouponItem
                key={coupon.id}
                coupon={coupon}
                showDownloadButton={false}
              />
            ))
          ) : (
            <p className='text-center text-gray-500 pt-10'>
              보유한 쿠폰이 없습니다.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}