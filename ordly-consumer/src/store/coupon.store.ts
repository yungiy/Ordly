import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Coupon } from '@/features/coupon/coupon-item';

type CouponState = {
  downloadedCoupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  isCouponDownloaded: (couponId: string) => boolean;
};

export const useCouponStore = create<CouponState>()(
  persist(
    (set, get) => ({
      downloadedCoupons: [],
      addCoupon: (coupon) => {
        if (get().isCouponDownloaded(coupon.id)) {
          return;
        }
        set((state) => ({
          downloadedCoupons: [...state.downloadedCoupons, coupon],
        }));
      },
      isCouponDownloaded: (couponId) => get().downloadedCoupons.some((c) => c.id === couponId),
    }),
    {
      name: 'downloaded-coupons-storage',
    },
  ),
);